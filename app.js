const fetchProfile = () => {
    const searchInput = document.querySelector('#searchInput')
    const username = searchInput.value
    
    fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((profileData) => {
        if(profileData.message === 'Not Found')     showErrorMessage('Profile not found!')
        else    showProfileData(profileData)
    })
    .catch((err) => {
        showErrorMessage('Some error occurred!')
    })
}

const showProfileData = (profile) => {
    const profileSection = document.querySelector('#profile')
    const username = profile.name || 'Untitled'
    const bio = profile.bio || 'No Information'
    const profileLink = profile.html_url  
    const login = profile.login
    const dp = profile.avatar_url
    
    profileSection.innerHTML = `
        <img src="${dp}" width="120">
        <h2>${username}</h2>
        <h3>${login}</h3>
        <p>${bio}</p>
        <a href="${profileLink}" target="_blank">View Profile</a>
    `

    if(!profileSection.classList.contains('active'))    profileSection.classList.add('active')
}

const showErrorMessage = (message) => {
    const profileSection = document.querySelector('#profile')
    profileSection.innerHTML = `<p>${profileSection}</p>`
}

const searchButton = document.querySelector('#searchButton')
searchButton.addEventListener('click', fetchProfile)