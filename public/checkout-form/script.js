$(document).ready(function() {

    //DOM elements
    const DOMstrings = {
        stepsBtnClass: 'multisteps-form__progress-btn',
        stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
        stepsBar: document.querySelector('.multisteps-form__progress'),
        stepsForm: document.querySelector('.multisteps-form__form'),
        stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
        stepFormPanelClass: 'multisteps-form__panel',
        stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
        stepPrevBtnClass: 'js-btn-prev',
        stepNextBtnClass: 'js-btn-next'
    };

    //remove class from a set of items
    const removeClasses = (elemSet, className) => {

        elemSet.forEach(elem => {

            elem.classList.remove(className);

        });

    };

    //return exect parent node of the element
    const findParent = (elem, parentClass) => {

        let currentNode = elem;

        while (!(currentNode.classList.contains(parentClass))) {
            currentNode = currentNode.parentNode;
        }

        return currentNode;

    };

    //get active button step number
    const getActiveStep = elem => {
        return Array.from(DOMstrings.stepsBtns).indexOf(elem);
    };

    //set all steps before clicked (and clicked too) to active
    const setActiveStep = (activeStepNum) => {

        //remove active state from all the state
        removeClasses(DOMstrings.stepsBtns, 'js-active');

        //set picked items to active
        DOMstrings.stepsBtns.forEach((elem, index) => {

            if (index <= (activeStepNum)) {
                elem.classList.add('js-active');
            }

        });
    };

    //get active panel
    const getActivePanel = () => {

        let activePanel;

        DOMstrings.stepFormPanels.forEach(elem => {

            if (elem.classList.contains('js-active')) {

                activePanel = elem;

            }

        });

        return activePanel;

    };

    //open active panel (and close unactive panels)
    const setActivePanel = activePanelNum => {

        //remove active class from all the panels
        removeClasses(DOMstrings.stepFormPanels, 'js-active');

        //show active panel
        DOMstrings.stepFormPanels.forEach((elem, index) => {
            if (index === (activePanelNum)) {

                elem.classList.add('js-active');

                setFormHeight(elem);

            }
        })

    };

    //set form height equal to current panel height
    const formHeight = (activePanel) => {

        const activePanelHeight = activePanel.offsetHeight;


        DOMstrings.stepsForm.style.height = `${activePanelHeight+200}px`;

    };

    const setFormHeight = () => {
        const activePanel = getActivePanel();

        formHeight(activePanel);
    }

    //STEPS BAR CLICK FUNCTION
    let toggle = true
    DOMstrings.stepsBar.addEventListener('click', e => {

        //check if click target is a step button
        const eventTarget = e.target;

        if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
            return;
        }

        //get active button step number
        const activeStep = getActiveStep(eventTarget);

        //set all steps before clicked (and clicked too) to active
        setActiveStep(activeStep);

        // Next panel validation

        if ($('#fName').val() == '') {
            $('#fName-error').show()
            return false
        } else if ($('#lName').val() == '') {
            $('#lName-error').show()
            return false
        } else if ($('#email').val() == '') {
            $('#email-error').show()
            return false
        } else {
            if (toggle) {
                setActivePanel(activeStep);
            }
            toggle = false
        }

        if ($('#translateFrom').val() == '') {
            $('#translateFrom-error').show()
            return false
        } else if ($('#translateTo').val() == '') {
            $('#translateTo-error').show()
            return false
        } else if ($('.page__count input').val() == '') {
            $('#pageCount-error').show()
            return false
        } else {
            setActivePanel(activeStep);
            toggle = true
        }

    });

    //PREV/NEXT BTNS CLICK
    let toggleForm = true;
    DOMstrings.stepsForm.addEventListener('click', e => {

        const eventTarget = e.target;

        //check if we clicked on `PREV` or NEXT` buttons
        if (!((eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) || (eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)))) {
            return;
        }

        //find active panel
        const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);

        let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);

        //set active step and active panel onclick
        if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
            activePanelNum--;

        } else {

            activePanelNum++;

        }

        setActiveStep(activePanelNum);
        if ($('#fName').val() == '') {
            $('#fName-error').show()
            return false
        } else if ($('#lName').val() == '') {
            $('#lName-error').show()
            return false
        } else if ($('#email').val() == '') {
            $('#email-error').show()
            return false
        } else {
            if (toggleForm) {
                setActivePanel(activePanelNum);
            }
            toggleForm = false
        }

        if ($('#translateFrom').val() == '') {
            $('#translateFrom-error').show()

            return false
        } else if ($('#translateTo').val() == '') {
            $('#translateTo-error').show()
            return false
        } else if ($('.page__count input').val() == '') {
            $('#pageCount-error').show()
            return false
        } else {
            setActivePanel(activePanelNum);
            toggleForm = true
        }

    });

    //SETTING PROPER FORM HEIGHT ONLOAD
    window.addEventListener('load', setFormHeight, false);

    //SETTING PROPER FORM HEIGHT ONRESIZE
    window.addEventListener('resize', setFormHeight, false);

    //changing animation via animation select !!!YOU DON'T NEED THIS CODE (if you want to change animation type, just change form panels data-attr)

    const setAnimationType = (newType) => {
        DOMstrings.stepFormPanels.forEach(elem => {
            elem.dataset.animation = newType;
        })
    };

    //selector onchange - changing animation
    const animationSelect = document.querySelector('.pick-animation__select');

    //   animationSelect.addEventListener('change', () => {
    //       // const newAnimationType = animationSelect.value;
    //       const newAnimationType = 'slideHorz';
    //       setAnimationType(newAnimationType);
    //   });






    // Stripe integration

    var $form = $(".stripe-payment");
    $('form.stripe-payment').bind('submit', function(e) {
        var $form = $(".stripe-payment"),
            inputVal = ['input[type=text]', 'input[type=file]',
                'textarea'
            ].join(', '),
            $inputs = $form.find('.required').find(inputVal),
            $errorStatus = $form.find('div.error'),
            valid = true;
        $errorStatus.addClass('hide');

        $('.has-error').removeClass('has-error');
        $inputs.each(function(i, el) {
            var $input = $(el);
            if ($input.val() === '') {
                $input.parent().addClass('has-error');
                $errorStatus.removeClass('hide');
                e.preventDefault();
            }
        });

        if (!$form.data('cc-on-file')) {
            e.preventDefault();
            Stripe.setPublishableKey($form.data('stripe-publishable-key'));
            Stripe.createToken({
                number: $('.card-num').val(),
                cvc: $('.card-cvc').val(),
                exp_month: $('.card-expiry-month').val(),
                exp_year: $('.card-expiry-year').val()
            }, stripeRes);
        }

    });

    function stripeRes(status, response) {
        if (response.error) {
            $('.error')
                .removeClass('hide')
                .find('.alert')
                .text(response.error.message);
        } else {
            var token = response['id'];
            let fname = $('#fname').val()
            let lname = $('#lname').val()
            let email = $('#email').val()
            let password = $('#password').val()
            let page_count = $('#pageCount input').val()
            let word_count = $('#wordCount input').val()
            let translate_from = $('#translateFrom').val()
            let translate_to = $('#translateTo').val()
            let translated_file = $('#translate_file').val()
            let serviceType;
            let types = document.querySelectorAll('.common__btn span');
            types.forEach(e => {
                console.log()
                if (e.innerHTML.trim() == 'Selected') {
                    serviceType = e.getAttribute('data-value')
                }
            })
            let grand_total = $('.grand_total').html()
            let days = $('.est_days').html()
            let notes = $('#notes').val()
            var payment_type = "Stripe";

            $form.find('input[type=text]').empty();
            $form.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
            $form.append("<input type='hidden' name='grand_total' value='" + grand_total + "'/>");
            $form.append("<input type='hidden' name='fname' value='" + fname + "'/>");
            $form.append("<input type='hidden' name='lname' value='" + lname + "'/>");
            $form.append("<input type='hidden' name='email' value='" + email + "'/>");
            $form.append("<input type='hidden' name='password' value='" + password + "'/>");
            $form.append("<input type='hidden' name='translate_type' value='" + serviceType + "'/>");
            $form.append("<input type='hidden' name='translate_from' value='" + translate_from + "'/>");
            $form.append("<input type='hidden' name='translate_to' value='" + translate_to + "'/>");
            $form.append("<input type='hidden' name='page_count' value='" + page_count + "'/>");
            $form.append("<input type='hidden' name='word_count' value='" + word_count + "'/>");
            $form.append("<input type='hidden' name='translated_file' value='" + translated_file + "'/>");
            $form.append("<input type='hidden' name='days' value='" + days + "'/>");
            $form.append("<input type='hidden' name='extra_service' value='" + extra_service + "'/>");
            $form.append("<input type='hidden' name='payment_type' value='" + payment_type + "'/>");
            $form.append("<input type='hidden' name='Notes' value='" + notes + "'/>");
            $form.get(0).submit();
        }
    }




    // PAYPAL iNTEGRATION
    function initPayPalButton() {
        paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'gold',
                layout: 'vertical',
                label: 'paypal',
            },
            createOrder: function(data, actions) {
                let grand_total = $('.grand_total').html()
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: Number(grand_total).toFixed(2)
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(orderData) {

                    var payer = orderData.payer;
                    var transaction_id = orderData.id;
                    var amount = orderData.purchase_units[0].amount;
                    var formData = {};

                    let serviceType;
                    let types = document.querySelectorAll('.common__btn span');
                    types.forEach(e => {
                        if (e.innerHTML.trim() == 'Selected') {
                            serviceType = e.getAttribute('data-value')
                        }
                    })

                    formData['fname'] = $('#fname').val()
                    formData['lname'] = $('#lname').val()
                    formData['email'] = $('#email').val();
                    formData['password'] = $('#password').val();
                    formData['translate_type'] = serviceType
                    formData['translate_from'] = $('#translateFrom').val()
                    formData['translate_to'] = $('#translateTo').val()
                    formData['page_count'] = $('#pageCount input').val()
                    formData['word_count'] = $('#wordCount input').val()
                    formData['translated_file'] = $('#translate_file').val()
                    formData['days'] = $('.est_days').html()
                    formData['extra_service'] = extra_service
                    formData['payment_type'] = 'Paypal';
                    formData['Notes'] = $('#notes').val()

                    $.ajax({
                        url: "http://translate.opediatech.com/paypal-order",
                        type: 'GET',
                        data: {
                            data: data,
                            formData: formData,
                            payer: payer,
                            transaction_id: transaction_id,
                            amount: amount
                        },
                        success: function(res) {
                            window.location = "/";
                            console.log(res)
                        },
                        error: function(error) {
                            console.log(error)
                        }
                    })
                });
            },
            onError: function(err) {
                console.log(err);
            }
        }).render('#paypal-button-container');
    }
    initPayPalButton();








});