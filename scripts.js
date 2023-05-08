$('document').ready(onReady);

function onReady() {
    console.log('jQuery loaded')

    // Event listener
    $('#submit-button').on('click', submitEmployee);

    // use event delegation to register this event handler
    $('#table-body').on('click', '.delete-button', deleteEmployee);
}

let currentAnnualCost = 0;


function formatSalary(salary) {
    // format salary
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
    })
    return formatter.format(salary); // return formatted salary
} // end formatSalary function

// Event handler
function submitEmployee(event) {
    event.preventDefault();
    console.log('submitted');
    // collect input info
    const firstName = $('#first-name').val();
    const lastName = $('#last-name').val();
    const employeeId = $('#employee-id').val();
    const jobTitle = $('#job-title').val();
    let annualSalary = Number($('#annual-salary').val());

    console.log('first name:', firstName);
    console.log('last name:', lastName);
    console.log('employee ID:', employeeId);
    console.log('job title:', jobTitle);
    console.log('annual salary:', annualSalary);
    
    // calculate montly costs

    // update currentAnnualCost
    currentAnnualCost += annualSalary;
    console.log('current annual cost:', currentAnnualCost);
    
    // divide by 12
    const totalMonthlyCost = (currentAnnualCost / 12);
    console.log(totalMonthlyCost);
    
    // append info to table
    // const employeeTableBody = $('#table-body'); 
    // not necessary, but some may find it clarifying 
    // to assign to variable rather than invoke jquery 
    // directly by $('#table-body')

    $('#table-body').append(`
    <tr>
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td>${employeeId}</td>
    <td>${jobTitle}</td>
    <td>${formatSalary(annualSalary)}</td>
    <td><button class"delete-button">Delete</button></td>
    `)
   

    // update monthly cost value on DOM
    $('#total-monthly').text(formatSalary(totalMonthlyCost));

    // clear inputs
    $('input').val('');


} // end submitEmployee function


function deleteEmployee() {
    console.log('delete', this);
    $(this).parent().parent().remove();


    // get value of employee's salary of the row we're in
    const formattedSalary = $(this).parent().prev().text();
    const numberSalary = formattedSalary.replace('$', '');

    console.log(numberSalary);
    // currentAnnualCost -= that value
    
} // end deleteEmployee function


