import { resolve } from 'path';
import { config } from 'dotenv';
import { Octokit } from '@octokit/rest';

import githubQuery from './githubQuery';
import generateBarChart from './generateBarChart';
import { userInfoQuery, createContributedRepoQuery, createCommittedDateQuery } from './queries';
/**
 * get environment variable
 */
config({ path: resolve(__dirname, '../.env') });

interface IRepo {
  name: string;
  owner: string;
}

(async() => {
  /**
   * First, get user id
   */
  const userResponse = await githubQuery(userInfoQuery)
    .catch(error => console.error(`Unable to get username and id\n${error}`));
  const { login: username, id } = userResponse?.data?.viewer;

  /**
   * Second, get contributed repos
   */
  const contributedRepoQuery = createContributedRepoQuery(username);
  const repoResponse = await githubQuery(contributedRepoQuery)
    .catch(error => console.error(`Unable to get the contributed repo\n${error}`));
  const repos: IRepo[] = repoResponse?.data?.user?.repositoriesContributedTo?.nodes
    .filter(repoInfo => (!repoInfo?.isFork))
    .map(repoInfo => ({
      name: repoInfo?.name,
      owner: repoInfo?.owner?.login,
    }));

  /**
   * Third, get commit time and parse into commit-time/hour diagram
   */
  const committedTimeResponseMap = await Promise.all(
    repos.map(({name, owner}) => githubQuery(createCommittedDateQuery(id, name, owner)))
  ).catch(error => console.error(`Unable to get the commit info\n${error}`));

  if (!committedTimeResponseMap) return;

  let morning = 0; // 6 - 11
  let daytime = 0; // 11 - 18
  let evening = 0; // 18 - 23
  let night = 0; // 23 - 6

  committedTimeResponseMap.forEach(committedTimeResponse => {
    committedTimeResponse?.data?.repository?.defaultBranchRef?.target?.history?.edges.forEach(edge => {
      const committedDate = edge?.node?.committedDate;
      const timeString = new Date(committedDate).toLocaleTimeString('en-US', { hour12: false, timeZone: process.env.TIMEZONE });
      const hour = +(timeString.split(':')[0]);

      /**
       * voting and counting
       */
      if (hour >= 6 && hour < 11) morning++;
      if (hour >= 11 && hour < 18) daytime++;
      if (hour >= 18 && hour < 23) evening++;
      if ((hour >= 23 && hour < 24) || (hour >= 0 && hour < 6)) night++;
    });
  });

  /**
   * Next, generate diagram
   */
  const sum = morning + daytime + evening + night;
  if (!sum) return;

  const oneDay = [
    { label: '🌞 Morning', commits: morning },
    { label: '🌆 Daytime', commits: daytime },
    { label: '🌃 Evening', commits: evening },
    { label: '🌙 Night', commits: night },
  ];

  const lines = oneDay.reduce((prev, cur) => {
    const percent = cur.commits / sum * 100;
    const line = [
      `${cur.label}`.padEnd(10, String.fromCharCode(160)),
      `${cur.commits.toString().padStart(5, String.fromCharCode(160))} commits`.padEnd(14, String.fromCharCode(160)),
      generateBarChart(percent, 19),
      String(percent.toFixed(1)).padStart(5, String.fromCharCode(160)) + '%',
    ];

    return [...prev, line.join(' ')];
  }, []);

  /**
   * Finally, write into gist
   */
  const owner = 'vnoctem';
  const repo = 'vnoctem';
  const path = 'README.md';

  const octokit = new Octokit({ auth: `token ${process.env.GH_TOKEN}` });
  const readme = await octokit.repos.getReadme({
    owner: owner,
    repo: repo,
  }).catch(error => console.error(`Unable to get README\n${error}`));

  if (!readme) return;

  const sha = readme.data.sha;

  await octokit.repos.createOrUpdateFile({
    owner: owner,
    repo: repo,
    path: path,
    message: '(Automated) Update README.md',
    content: Buffer.from('```text' + lines.join('<br>') + '```', 'utf8').toString('base64'),
    sha: sha
  }).catch(error => console.error(`Unable to update README\n${error}`));
})();
