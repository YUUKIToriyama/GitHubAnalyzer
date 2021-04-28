const { Octokit } = require("@octokit/core");
const settings = require("./settings");
const octokit = new Octokit(settings);

const getAllReposOfTheUser = (userName) => {
	return octokit.request("GET /users/{username}/repos", {
		username: userName,
		sort: "updated",
		per_page: 10,
	}).then(response => {
		return response.data.map(repository => repository.name);
	}).catch(error => {
		console.log(error);
	});
};

const getLanguagesUsedInTheRepo = (userName, repositoryName) => {
	return octokit.request("GET /repos/{owner}/{repo}/languages", {
		owner: userName,
		repo: repositoryName
	}).then(response => {
		return response.data;
	})
}

//getUsersAllRepos("YUUKIToriyama").then(a => { console.log(a.join("\n")) })
/*
getLanguagesUsedInRepo("YUUKIToriyama", "imageCompare").then(result => {
	console.log(result)
});
*/

const userName = "YUUKIToriyama";
getAllReposOfTheUser(userName).then(async repositoryNames => {
	const frequencyOfLanguages = {};
	for (let repositoryName of repositoryNames) {
		await getLanguagesUsedInTheRepo(userName, repositoryName).then(frequency => {
			Object.keys(frequency).forEach(language => {
				if (!frequencyOfLanguages.hasOwnProperty(language)) {
					frequencyOfLanguages[language] = 0;
				}
				frequencyOfLanguages[language] = + frequency[language];
			});
		});
	}
	return frequencyOfLanguages;
}).then(result => {
	console.log(result);
})