document.addEventListener('DOMContentLoaded', function () {
    // Real-time update event listeners
    document.getElementById('name').addEventListener('input', updateCardName);
    document.getElementById('card-num').addEventListener('input', updateCardNumber);
    document.getElementById('month').addEventListener('input', updateExpDate);
    document.getElementById('year').addEventListener('input', updateExpDate);
    document.getElementById('cvcInput').addEventListener('input', updateCVC);

    const input = document.querySelector('input')

    // Form submission event listener
    document.getElementById('formElement').addEventListener('submit', validateForm);

    // Continue button event listener
    document.getElementById('continueBtn').addEventListener('click', resetFormAndShow);

    // Real-time update functions
    function updateCardName() {
        const name = document.getElementById('name').value;
        document.getElementById('fullName').textContent = name || 'Jane Appleseed';
    }

    function updateCardNumber() {
        let number = document.getElementById('card-num').value;
        number = number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
        document.getElementById('fullCardNumber').textContent = number || '0000 0000 0000 0000';
    }

    function updateExpDate() {
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;
        document.getElementById('card-date').textContent = `${month.padStart(2, '0')}/${year.padStart(2, '0')}`;
    }

    function updateCVC() {
        const cvc = document.getElementById('cvcInput').value;
        document.getElementById('cvc').textContent = cvc || '000';
    }

    // Form validation function
    function validateForm(event) {
        event.preventDefault(); // Prevent default form submission

        let isValid = true;

        if (!validateName()) isValid = false;
        if (!validateCardNumber()) isValid = false;
        if (!validateExpDate()) isValid = false;
        if (!validateCVC()) isValid = false;

        if (isValid) {
            document.getElementById('formElement').style.display = 'none';
            document.getElementById('thank-you').style.display = 'block';
        }
    }

    // Function to reset the form and show it again
    function resetFormAndShow() {
        document.getElementById('thank-you').style.display = 'none';
        document.getElementById('formElement').style.display = 'flex';
        document.getElementById('formElement').reset();
        resetCardDisplay();
    }

    // Function to reset the card display
    function resetCardDisplay() {
        document.getElementById('fullName').textContent = 'Jane Appleseed';
        document.getElementById('fullCardNumber').textContent = '0000 0000 0000 0000';
        document.getElementById('card-date').textContent = '00/00';
        document.getElementById('cvc').textContent = '000';
    }

    // Individual validation functions
    function validateName() {
        const nameInput = document.getElementById('name');
        const name = nameInput.value;
        // Regular expression to check if the input contains only letters (and spaces)
        const regex = /^[a-zA-Z\s]+$/;

        if (name.match(regex) && name.trim().length > 0) {
            document.getElementById('errorName').style.display = 'none';
            nameInput.style.border = '';
            return true;
        } else {
            document.getElementById('errorName').style.display = 'block';
            nameInput.style.border = " 1px solid red";
            return false;
        }
    }

    function validateCardNumber() {
        const cardNumberInput = document.getElementById('card-num');
        const cardNumber = cardNumberInput.value;

        const cleanedNumber = cardNumber.replace(/\s+/g, '');
        const regex = /^\d{16}$/;


        if (cleanedNumber.match(regex)) {
            document.getElementById('errorNum').style.display = 'none';
            cardNumberInput.style.border = '';
            return true;
        } else {
            document.getElementById('errorNum').style.display = 'block';
            cardNumberInput.style.border = '1px solid red';
            return false;
        }
    }

    function validateExpDate() {
        const monthInput = document.getElementById('month');
        const yearInput = document.getElementById('year');
        const errorMonth = document.getElementById('errorMonth');
        const errorDate = document.getElementById('errorDate');
        const month = monthInput.value;
        const year = yearInput.value;
        const monthRegex = /^(0[1-9]|1[0-2])$/; // Matches 01-12
        const yearRegex = /^\d{2}$/; // Matches any two digits

        let isValid = true;

        if (month === '') {
            errorMonth.textContent = "Can't be blank";
            errorMonth.style.display = 'block';
            monthInput.style.border = '1px solid red';
            isValid = false;
        } else if (!monthRegex.test(month)) {
            errorMonth.textContent = "Wrong format";
            errorMonth.style.display = 'block';
            monthInput.style.border = '1px solid red';
            isValid = false;
        } else {
            errorMonth.style.display = 'none';
            monthInput.style.border = '';
        }

        if (year === '') {
            // errorDate.textContent = "Can't be blank";
            errorDate.style.display = 'block';
            yearInput.style.border = '1px solid red';
            isValid = false;
        } else if (!yearRegex.test(year)) {
            // errorDate.textContent = "Wrong format";
            errorDate.style.display = 'block';
            yearInput.style.border = '1px solid red';
            isValid = false;
        } else {
            errorDate.style.display = 'none';
            yearInput.style.border = '';
        }

        return isValid;
    }


    function validateCVC() {
        const cvcInput = document.getElementById('cvcInput');
        const errorCvc = document.getElementById('errorCvc');
        const cvc = cvcInput.value;
        const cvcRegex = /^\d{3}$/; // Matches exactly 3 digits

        if (cvc === '') {
            errorCvc.textContent = "Can't be blank";
            errorCvc.style.display = 'block';
            cvcInput.style.border = '1px solid red';
            return false;
        } else if (!cvcRegex.test(cvc)) {
            errorCvc.textContent = "Wrong format";
            errorCvc.style.display = 'block';
            cvcInput.style.border = '1px solid red';
            return false;
        } else {
            errorCvc.style.display = 'none';
            cvcInput.style.border = ''; // Revert to the default border
            return true;
        }
    }
});
