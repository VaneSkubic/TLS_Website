import $ from 'jquery'

$(document).ready(function () {
    initCart();
    cartCalculation();
});

function initCart() {
    if ($('#checkbox_delivery').is(':checked') == true) {
        $("#address_delivery").toggleClass('disabled');
        $("#address_delivery").find('input').prop('disabled', function (i, v) {
            return !v;
        });
        $("#address_delivery").find('select').prop('disabled', function (i, v) {
            return !v;
        });
    }
    $('#checkbox_delivery').click(function () {
        $("#address_delivery").toggleClass('disabled');
        $("#address_delivery").find('input').prop('disabled', function (i, v) {
            return !v;
        });
        $("#address_delivery").find('select').prop('disabled', function (i, v) {
            return !v;
        });
    });

    $("#frmBasketDeliveryMethod input[type='radio']").on("change", function() {
        $(this).next("label").removeClass("error");
    })

    const authenticated = $(".cart-main").data("authenticated");

    $("input[name='ShippingProviderCode'], input[name='PaymentTypeCode'], select[name='CountryCode']").on("change", function() {
        const ShippingProviderCode = $('input[name=ShippingProviderCode]').is(':checked');
        const PaymentTypeCode = $('input[name=PaymentTypeCode]').is(':checked');

        authenticated ? basketDeliveryAddress() : basketAnonymous(); 

        if (ShippingProviderCode && PaymentTypeCode) {
            basketDeliveryMethod();
        }
        
    })

    $("#frmBasketAnonymous input.cart-form-control, input:radio[name=PartnerForm]").on("change", function() {
        $('#frmBasketAnonymous input.cart-form-control:not(:disabled), #frmBasketDelivery input.cart-form-control:not(:disabled)').each(function() {
            if(!$(this).val()){
                $(".cart-form-group-checkbox").addClass("hidden");
               return false;
            } else {
                $(".cart-form-group-checkbox").removeClass("hidden");
            }
        });
    })

    $('#frmBasketAnonymous input.cart-form-control:not(:disabled), #frmBasketDelivery input.cart-form-control:not(:disabled)').each(function() {
        if(!$(this).val()){
            $(".cart-form-group-checkbox").addClass("hidden");
           return false;
        } else {
            $(".cart-form-group-checkbox").removeClass("hidden");
        }
    });
}

function triggerError() {
    $(".cart-error-message").addClass("active");
    $('html, body').animate({
        scrollTop: $(".cart-error-message").offset().top - 100
    }, 300);
    $("#frmBasketshow").hide();
}

function displayLoading(target) {
    if (target == null) {
        return;
    }

    target.find('.js-loading-trigger').prop('disabled', true);
    target.find('.js-loading-img').show();
    target.find('.js-loading-img').removeAttr('hidden');
}

function basketDeliveryAddress() {
    var valid = site.common.validate("frmBasketDelivery");
    if (valid == false) {
        triggerError();
        return false;
    }

    $.ajax({
        url: '/Data/BasketDeliveryAddress',
        type: 'POST',
        data: $('#frmBasketDelivery').serialize()
    }).done(
        (result) => {
            if (result && result.success == true) { 
                site.basket.renderData(result.basket);
            }
        }
    );
}

function basketAnonymous(container, nextStepUrl, element) {
    var valid = site.common.validate("frmBasketAnonymous");
    if (valid == false) {
        triggerError();
        return false;
    }

    $.ajax({
        url: '/Data/AnonymousCustomerData',
        type: 'POST',
        data: $('#frmBasketAnonymous').serialize()
    }).done(
        (result) => {
            if (result && result.success == true) {
               site.basket.renderData(result.basket);
            }
        }
    );
}

async function basketDeliveryMethod() {
    var valid = site.common.validate("frmBasketDeliveryMethod");
    if (valid == false) return false;

    $(".cart-error-message").removeClass("active");
    $("#frmBasketDeliveryMethod label.custom-control-label").removeClass("error-msg");
    
    const result  = await $.ajax({
        url: '/Data/BasketDeliveryMethod',
        type: 'POST',
        data: $('#frmBasketDeliveryMethod').serialize(),
    }).done(
        (result) => {
            if (result && result.success == true) {
                site.basket.renderData(result.basket);
            } else {
                $(".cart-error-message").addClass("active");
                const ShippingProviderCode = $('input[name=ShippingProviderCode]').is(':checked');
                const PaymentTypeCode = $('input[name=PaymentTypeCode]').is(':checked');
                $("#frmBasketshow").hide();
                !ShippingProviderCode ? $('input[name=ShippingProviderCode]').next("label").addClass("error-msg") : null;
                !PaymentTypeCode ? $('input[name=PaymentTypeCode]').next("label").addClass("error-msg") : null;
            }
        }
    );   

    return result;
}

// DELETE NEXT PROJECT start
async function basketDeliveryMethodWithoutError() {
    var valid = site.common.validate("frmBasketDeliveryMethod");
    if (valid == false) return false;
    
    await $.ajax({
        url: '/Data/BasketDeliveryMethod',
        type: 'POST',
        data: $('#frmBasketDeliveryMethod').serialize(),
    }).done(
        (result) => {
            if (result && result.success == true) {
                site.basket.renderData(result.basket);
            }
        }
    );   
}
window.basketDeliveryMethodWithoutError = basketDeliveryMethodWithoutError;

function ShopAgreeWithTerms() {
    if ($("#datePickup") && $("#timePickup")) {
        if ($('#AgreeWithTermsCheckBox').is(':checked') && $("#datePickup").val() != "" && $("#timePickup").val() != "") {
            $('#buttonAgreeWithTerms').removeAttr('disabled');
            $('.shop-form-submit-wrapper').tooltip("dispose");
        } else {
            $('#buttonAgreeWithTerms').attr('disabled', 'disabled');
            $('.shop-form-submit-wrapper').tooltip();
        }
    } else {
        if ($('#AgreeWithTermsCheckBox').is(':checked')) {
            $('#buttonAgreeWithTerms').removeAttr('disabled');
            $('.shop-form-submit-wrapper').tooltip("dispose");
        } else {
            $('#buttonAgreeWithTerms').attr('disabled', 'disabled');
            $('.shop-form-submit-wrapper').tooltip();
        }
    }
}
window.ShopAgreeWithTerms = ShopAgreeWithTerms;

function mailchimpRegistration() {
    $('#mc-embedded-subscribe-form').trigger('submit');
}

async function basketSubmitCustom(redirectUrl, stripeUrl, userType) {
    $(".cart-error-message").removeClass("active");
    $("#frmBasketshow").show();
    
     if(userType == 1) {
        if (basketDeliveryAddress() == false) return false;
    } else {
        if (basketAnonymous() == false) return false;
    }

    if (await basketDeliveryMethod() == "") {
        return false;
    }

    if ($("#Note").val() != "") {
        $.ajax({
            url: '/Data/BasketSetCustomerNote',
            type: 'POST',
            data: $('#Note').serialize()
        })
    }

    $.ajax({
        url: '/Data/SubmitBasket',
        type: 'POST',
        data: {}
    }).done(
        (result) => {
            if (result && result.success == true) {
                if (result && result.success == true && result.data != "" && result.data != null) {
                    var stripe = Stripe(stripeUrl);
                    mailchimpRegistration();
                    setTimeout(function() {
                        stripe.redirectToCheckout({ sessionId: result.data });
                    }, 500);
                    return;
                }
                else if (result.redirectUrl != '' && result.redirectUrl != null && result.redirectUrl != 'null') {
                    mailchimpRegistration();
                    setTimeout(function() {
                        window.location.href = result.redirectUrl;
                    }, 500);
                } else {
                    mailchimpRegistration();
                    setTimeout(function() {
                        window.location.href = redirectUrl;
                    }, 500);
                }
            } else {
                mailchimpRegistration();
                setTimeout(function() {
                    window.location.href = redirectUrl;
                }, 500);
            }
        }
    );
}

window.basketDeliveryMethod = basketDeliveryMethod;
window.basketSubmitCustom = basketSubmitCustom;

// Custom qty btn on single product page
function cartCalculation() {
    $('.btn-quantity').click(function (e) {
        e.preventDefault();
        var fieldName = $(this).attr('data-field');
        var type = $(this).attr('data-type');
        var input = $(this).closest('.cart-item-quantity').find("input[name='" + fieldName + "']");
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if (type == 'minus') {

                if (currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                    site.basket.productCalculation($(this).attr('data-prod-name'), $(this).closest(".input-group-btn").siblings("input[name='qty']").val(), function (result) {
                        /* $('#divProductTotalPrice').html(result.TotalValueGross); */
                        $('#basket-blink').fadeOut('slow').load('' + ' #basket-blink').fadeIn("slow");
                        console.log(result)
                    });
                }
                if (parseInt(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }

            } else if (type == 'plus') {

                if (currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
                    site.basket.productCalculation($(this).attr('data-prod-name'), $(this).closest(".input-group-btn").siblings("input[name='qty']").val(), function (result) {
                       /*  $('#divProductTotalPrice').html(result.TotalValueGross); */
                        $('#basket-blink').fadeOut('slow').load('' + ' #basket-blink').fadeIn("slow");
                    });
                }
                if (parseInt(input.val()) == input.attr('max')) {
                    $(this).attr('disabled', true);
                }

            }
        } else {
            input.val(0);
        }
    });

    $('.btn-quantity-number').focusin(function () {
        $(this).data('oldValue', $(this).val());
    });

    $('.btn-quantity-number').change(function () {
        var minValue = parseInt($(this).attr('min'));
        var maxValue = parseInt($(this).attr('max'));
        var valueCurrent = parseInt($(this).val());

        var name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(this).closest('.cart-item-quantity').find(".btn-quantity[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(this).closest('.cart-item-quantity').find(".btn-quantity[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            $(this).val($(this).data('oldValue'));
        }
    });

    $(".btn-quantity-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
}

window.cartCalculation = cartCalculation;