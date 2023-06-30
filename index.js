function validation(form) {
    let result = 0;
    let regexMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    form.querySelectorAll('input').forEach(el => {
        if(!el.value.trim()) {
            addRequiredMessage(el);
            return false;
        } else {
            el.value = el.value.trim();
            if(el.parentNode.querySelector('.required')) el.parentNode.querySelector('.required').remove();
            if(!regexMail.test(el.value) && el.parentNode.querySelector('label').innerHTML === 'Ваша почта') {
                addValidMailMessage(el);
                return false;
            } else {
                result++;
            }
        }
    });

    let textarea = document.querySelector('textarea');
    if(!textarea.value.trim()) {
        addRequiredMessage(textarea);
        return false;
    } else {
        textarea.value = textarea.value.trim(); 
        if(textarea.parentNode.querySelector('.required')) textarea.parentNode.querySelector('.required').remove();
        result++;
    }
    
    if(result === 3) return true;
}

function addRequiredMessage(field) {
    let requiredSpan = document.createElement('span');
    requiredSpan.classList.add('required');
    requiredSpan.innerHTML = 'Это обязательное поле*';
    
    field.value = field.value.trim();
    
    field.parentNode.append(requiredSpan);
}

function addValidMailMessage(field) {
    let validMailSpan = document.createElement('span');
    validMailSpan.classList.add('required');
    validMailSpan.innerHTML = 'Некорректная почта*';

    field.value = field.value.trim();

    field.parentNode.append(validMailSpan);
}

//
function scrollTo() {
    window.scroll({
        left: 0,
        top: 0,
        behavior: 'smooth'
    })
}

let img = document.querySelectorAll('.scroll');
img.forEach(el => {
    el.addEventListener('click', () => {
        scrollTo();
    })
})
//

let main = document.querySelector('.main');

let blur = document.querySelector('.blur');

let hamburger = document.querySelector('#hamburger');
hamburger.addEventListener('click', () => {
    blur.style.zIndex = 10;
    blur.style.opacity = 0.75;
    let menu = document.querySelector('.menu');
    menu.style.left = 0 + 'px';
    
})

let exit = document.querySelector('#exit');
exit.addEventListener('click', () => {
    blur.style.zIndex = -10;
    blur.style.opacity = 0;
    let menu = document.querySelector('.menu');
    menu.style.left = -345 + 'px';
})



const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "GET"
    }) 

    return await res.text(); 
}

document.querySelector('#add-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let data = [];
    if(validation(this) === true) {
        this.querySelectorAll('input').forEach(el => {
            data.push(el.value);
        })
        data.push(this.querySelector('textarea').value)
       
    } 
    
    if(data) {
        postData('#', JSON.stringify(data))
            .then(res => {
                console.log(res);
                alert('Successful')
            })
            .catch(() => console.log('error'))
    }

})