const { Octokit } = require("@octokit/core");

const octokit = new Octokit();

const getAllReposOfTheUser = async (userName) => {
	return octokit.request("GET /users/{username}/repos", {
		username: userName,
		sort: "updated",
		per_page: 100,
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
		return result.data;
	})
}
