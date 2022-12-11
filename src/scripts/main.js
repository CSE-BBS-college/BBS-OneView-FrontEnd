import { Success, Error } from "./Utils/Alert";
import RenderStudentView from "./RenderStudentView";
const teacher_toggle = document.getElementById('teacher-toggle');
const student__view = document.getElementsByClassName('student__view')[0]
const teacher__view = document.getElementsByClassName('teacher__view')[0]
const roll_number = document.getElementById('roll-number')
const initial__view = document.getElementById('initial__view')
const result__view = document.getElementById('result__view')
const alert_section = document.getElementsByClassName('alert_section')[0]
const student__submit = document.getElementById('student__submit')


const handleStudentClick = () => {
    if (roll_number.value.length < 1) {
        alert_section.innerHTML = Error('Please enter a roll number')
        return
    }

    if (roll_number.value.length < 13 || roll_number.value.length > 13) {
        alert_section.innerHTML = Error('Please enter a valid roll number')
        return
    }    
    initial__view.classList.add('hidden')
    result__view.classList.remove('hidden') 
    RenderStudentView(roll_number.value)

}


// Toggle between teacher and student view
teacher_toggle.addEventListener('click', (e) => {
    if (e.target.checked) {
        teacher__view.classList.remove('hidden')
        student__view.classList.add('hidden')
    }
    else {
        teacher__view.classList.add('hidden')
        student__view.classList.remove('hidden')
    }
    });

student__submit.addEventListener('click', handleStudentClick)