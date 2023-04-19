const avatarBox = document.getElementById('avatar-box');
const profileForm = document.getElementById('profile-form');
const csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
console.log(csrf);
const bioInput = document.getElementById('id_bio');
const avatarInput = document.getElementById('id_avatar');
const alertBox = document.getElementById('alert-box');

const getCookie =(name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');
console.log(csrftoken);

profileForm.addEventListener('submit', e=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('csrfmiddlewaretoken', csrf);
    formData.append('bio', bioInput.value);
    formData.append('avatar', avatarInput.files[0]);

    $.ajax({
        type: 'POST',
        url: '',
        data: formData,
        success: function(response) {
            console.log(response);
            avatarBox.innerHTML = `
            <img src="${response.avatar}" class="rounded" height="200px" width="auto" alt="${response.user}">
            `
            bioInput.value = response.bio
            handleAlerts('success', 'Profile updated successfully');
        },
        error: function(error) {
            console.log(error);
            handleAlerts('danger', 'Oops! Something went wrong...');
        },
        processData: false,
        contentType: false,
        cache: false,
    })
})