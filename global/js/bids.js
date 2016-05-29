$(document).ready(function () {
    var ct_uniqids = [];

    socket.emit('ready', {}, function (data) {
        var serverTime = new Date(data.time * 1000);
        var start = new Date();

        $('.time-countdown').each(function () {
            var ts = $(this).data('utc-ts');
            var uniqid = $(this).data('sale-uniqid');
            var saleEndTime = new Date(ts * 1000);

            var now = new Date();
            var timeDiff = now.getTime() - start.getTime();

            var serverSync = new Date(serverTime.getTime() + timeDiff);

            $(this).countdown({
                until: saleEndTime,
                serverSync: function () {
                    return serverSync;
                },
                format: 'dHMS',
                significant: 3,
                labels: countdown_labels,
                labels1: countdown_labels,
                padZeroes: true,
                alwaysExpire: false,
                expiryText: TRAD_SALE_FINISHED_SHORT,
                onExpiry: function () {
                    if (ct_uniqids.indexOf(uniqid) == -1) {
                        ct_uniqids.push(uniqid);
                        var block = $('.block[data-sale-uniqid="' + uniqid + '"]');
                        block.find('.bid-input-wrapper').remove();
                        block.find('.button-bid').remove();
                        block.find('.your-bid-label').text(TRAD_SALE_FINISHED);
                        block.find('.current-bid-label').text(TRAD_LAST_BID);
                    }
                }
            });
        });
    });

    socket.on('user_bid_updated', function (data) {
        setLatestUserBidValue(
            data.uniqid,
            accounting.formatNumber(data.amount)
        );
    });

    socket.on('bid_updated', function (data) {
        setCurrentBidValue(data.uniqid, accounting.formatNumber(data.current_amount));
        setCountBidsValue(data.uniqid, data.bids_count);
        setBidMinValue(data.uniqid, data.next_minimal_amount);
    });

    if ($("#your-bid-form").length > 0) {
        if (!$('#your-bid-button').hasClass('keep-disabled')) {
            $('#your-bid-button').removeClass('disabled').removeClass('waiting');
        }

        var validator = $("#your-bid-form").validate({
            rules: {
                "your-bid-input": {
                    required: true,
                    digits: true,
                    min: $("#your-bid-input").data('min-value')
                }
            },
            showErrors: function (errorMap, errorList) {
                $('#your-bid-messages').hide().empty();

                if (this.numberOfInvalids() > 0) {
                    $("#your-bid-input-not-valid-info span").html(accounting.formatNumber($("#your-bid-input").data('min-value')));
                    $("#your-bid-input-not-valid-info").show();
                }
                else {
                    $("#your-bid-input-not-valid-info").hide();
                }
            }
        });

        $('#your-bid-button').click(function (e) {
            e.preventDefault();
            submitBid();
        });
        $('#your-bid-form').submit(function (e) {
            e.preventDefault();
            submitBid();
        });

        var refreshDisplayBidMinValue = function () {
            var minValue = $("#your-bid-input").data('min-value');
            $("#your-bid-input").rules("add", {
                min: minValue
            });
            $("#your-bid-input-not-valid-info span").html(minValue);
            var newPlaceholder = TRAD_SAISISSEZ_AU_MINIMUM.replace('%s', accounting.formatNumber(minValue));
            $("#your-bid-input.connected-user").attr('placeholder', newPlaceholder);
        };
    }

    var setBidMinValue = function (uniqid, val) {
        if ($('.block[data-uniqid="' + uniqid + '"] #your-bid-input').length > 0) {
            $('.block[data-uniqid="' + uniqid + '"] #your-bid-input').data('min-value', val);
            refreshDisplayBidMinValue();
        }
    };
    var setCurrentBidValue = function (uniqid, val) {
        $('.block[data-uniqid="' + uniqid + '"] .current-bid-value').html(val + ' ' + currency);
    };
    var setCountBidsValue = function (uniqid, val) {
        $('.block[data-uniqid="' + uniqid + '"] .count-bids-value').html(val);
    };
    var setLatestUserBidValue = function (uniqid, val) {
        $('.block[data-uniqid="' + uniqid + '"] .latest-user-bid-value').html(val + ' ' + currency).parent().removeClass('hidden');
    };
    var setLotsBidsTotalValue = function (uniqid, val) {
        $('.block[data-sale-uniqid="' + uniqid + '"] .sale-lots-bids-total .value').html(val + ' ' + currency).parent().removeClass('hidden');
    };
    var submitBid = function () {
        $('#your-bid-messages').hide().empty();
        if (validator.element("#your-bid-input")) {
            var input = $('#your-bid-input');
            socket.emit('new_bid', {
                    uniqid: input.data('uniqid'),
                    type: input.data('type'),
                    userid: userid,
                    amount: input.val()
                },
                function (data) {
                    if (!data.success) {
                        switch (data.message) {
                            case 'upper_bid_exists':
                                var message = TRAD_UPPER_BID_EXISTS.replace('%s', accounting.formatNumber(data.amount));
                                break;
                            case 'equal_bid_exists':
                                var message = TRAD_EQUAL_BID_EXISTS.replace('%s', accounting.formatNumber(data.amount));
                                break;
                            case 'bid_error':
                                var message = TRAD_BID_ERROR;
                                break;
                            case 'sale_not_exists':
                                var message = TRAD_SALE_NOT_EXISTS;
                                break;
                            case 'lot_not_exists':
                                var message = TRAD_LOT_NOT_EXISTS;
                                break;
                            case 'sale_finished':
                                var message = TRAD_SALE_FINISHED;
                                break;
                            case 'user_not_exists':
                                var message = TRAD_USER_NOT_EXISTS;
                                break;
                            case 'sale_bids_not_allowed':
                                var message = TRAD_BID_NOT_ALLOWED_SALE;
                                break;
                            case 'lot_bids_not_allowed':
                                var message = TRAD_BID_NOT_ALLOWED_LOT;
                                break;
                            case 'best_bidder':
                                var message = TRAD_BEST_BIDDER;
                                break;
                        }

                        $('#your-bid-messages').empty().append(
                            $('<p class="bid-info-message">').html('<i class="fa fa-exclamation-triangle"></i> ' + message)
                        ).show();
                    }
                });

            input.val('');
        }
    };
});
