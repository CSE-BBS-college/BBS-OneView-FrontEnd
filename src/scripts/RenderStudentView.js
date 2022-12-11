import { FetchResult } from "./Utils/FetchResult";
import { Success, Error } from "./Utils/Alert";
import logo from '../assets/logo.png';
import notfound from '../assets/404.png';
const result__view = document.getElementById('result__view');

const RenderStudentView = async (roll_number) => {
    const result = await FetchResult(roll_number);
    console.log(result);
    if (result.status === 'success') {
        const marks = JSON.parse(result.data.Marks);
        const subjects = JSON.parse(result.data.Subjects);
        const total_marks = marks.reduce((a, b) => a + b, 0);
        const percentage = ((total_marks / (marks.length * 30)) * 100).toFixed(2);
        result__view.innerHTML = `
            <div class="result__view w-fit sm:-w-[95%] sm:-overflow-x-auto" >
            <div class="flex flex-col justify-center items-center">
                <img src=${logo} alt="logo" class="w-[80px] h-[80px]">
                <h1 class="text-xl mb-4 sm:-text-sm font-bold">BBS College of Engineering and Technology</h1>
                <hr class="w-[70%] border-[0.1rem] border-slate-800 rounded-xl border-dashed ">
                <h3 class="text-xl sm:-text-md font-medium  underline text-slate-800 mt-4 mb-4">Result </h3>
            </div>
            <h3 class="text-left mb-1">
            <span class="font-medium">UID: </span>
            ${result.data.Code+"-"+result.data.Roll_Number}</h3>
            <div class="flex flex-row sm:-flex-col justify-between items-center">
                <div class="flex flex-col justify-center items-start gap-[0.22rem]">
                    <h1 class="student__name">
                        <span class="font-medium">Name: </span>
                        ${result.data.Name}
                     </h1>
                     <h1 class="student__name">
                     <span class="font-medium">Branch: </span>
                      ${result.data.Branch}
                      </h1>

                    <h1 class="student__name">
                    <span class="font-medium">Year: </span>
                    ${result.data.Year}</h1>
                </div>
                <div class="flex flex-col justify-center items-start gap-[0.18rem]">
                    <h3 class="student__total-marks">
                    <span class="font-medium">Semester: </span>
                    ${result.data.Semester}
                    </h3>
                    <h3 class="student__total-marks">
                    <span class="font-medium">Total Marks: </span>
                    ${total_marks}</h3>
                    <h3 class="student__percentage">
                    <span class="font-medium">Percentage: </span>
                    ${percentage +" " + "%"}</h3>
                </div>
            </div>
            <div class="flex flex-row my-4 justify-center items-center btn__container">
            <button type="button" class="text-white bg-slate-900 hover:bg-[#24292F]/90 focus:outline-none  font-medium rounded-lg text-sm px-3.5 py-2 text-center inline-flex items-center mr-2 mb-2" onclick="window.location.reload()">
            <span class="mr-[5px] rotate-90 inline-block ">&#x21bb;</span>
            Check Another Result
          </button>
          <button type="button" class="text-white bg-yellow-800 hover:bg-yellow-800/90 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center mr-2 mb-2" onclick="window.print()">
          <span class="mr-[5px]">&#128438;</span>
            Print
          </button>
            </div>
<div class="flex flex-col sm:w-[90%] mt-4">
  <div class="overflow-x-visible sm:-w-[400px] sm:-overflow-x-auto sm:-mx-6 lg:-mx-8  ">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden rounded-lg shadow-md">
        <table class="min-w-full border text-center ">
          <thead class="thead border-b bg-slate-800 print:-border-b-gray-400 text-white">
            <tr>
              <th scope="col" class="text-sm font-medium print:-text-neutral-800 text-white px-6 py-4 border-r">
                #
              </th>
              <th scope="col" class="text-sm font-medium text-white print:-text-neutral-800 px-6 py-4 border-r">
                Subject
              </th>
              <th scope="col" class="text-sm font-medium text-white print:-text-neutral-800 px-6 py-4 border-r">
                Marks
              </th>
              <th scope="col" class="text-sm print:-text-neutral-800 font-medium text-white px-6 py-4">
                Percentage
              </th>
            </tr>
          </thead>
          <tbody>
          ${subjects.map((subject, index) => {
            return `
                <tr class="border-b">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">${index+1}</td>
                <td class="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap border-r">
                    ${subject}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                    ${marks[index]} / 30
                </td>
                <td class="text-sm  ${marks[index] >= 9? "text-gray-900 font-medium" : "text-red-400 font-semibold"}   px-6 py-4 whitespace-nowrap border-r ">
                ${marks[index] >= 9? "PASS" : "FAIL"}
            </td>

              </tr>
       `}
          ).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</div>
        `;
    }
    else {
        result__view.innerHTML = `
        <div class="flex flex-col justify-center items-center gap-[0.5rem]">
        <h1 class="text-xl font-semibold text-gray-900">${result.message}<h1> <br>
        <br>
        <img src="${notfound}" alt="not-found" class="w-[200px] h-[200px] mb-4">
        <button type="button" class="text-white bg-slate-900 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-3.5 py-2 text-center inline-flex items-center mr-2 mb-2" onclick="window.location.reload()">
        <span class="mr-[5px] rotate-90 inline-block ">&#x21bb;</span>
        Check Another Result
        </button>
        </div>`
        
    }
}

export default RenderStudentView;