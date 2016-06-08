export default function (data) {
  return `
<div class="ticket-outer-wrap" data-rating="${data.ticket_rating}">
    ${data.highlight_info ? `
        <div class="highlight-plate ${data.highlight_info.plate_class}">${data.highlight_info.text}
            <span class="inline-block">
                ${data.highlight_info.price_in_currency}&nbsp;<span
                        class="currency-code ${data.highlight_info.currency}"></span>
            </span>
        </div>
    ` : ``}
    <div class="ticket js-ticket ${[data.ticket_type_class, data.highlight_class, data.highlight_info.plate_class, data.opened_class, data.expired_class].join(' ')}"
         data-index="${data.index}">
        <div class="ticket-buy-block">
            <a class="js-buy-button" data-metainfo="${data.main_proposal.metainfo}" data-ticket-index="${data.index}"
               href="${data.main_proposal.deeplink}" target="_blank">
                <div class="price-block ${data.expired_price_class}">
                    <span class="ticket-main-price">
                        ${data.main_proposal.price}
                    </span>
                </div>
                <button class="button ticket-buy-button orange-button">
                    <div class="semibold book-now">
                        ${data.main_button_text}
                    </div>
                    <div class="main-proposal-name">Buy on &nbsp;${data.main_proposal.name}</div>
                </button>

                ${data.main_proposal_original_gate_price ? `
                    <div class="poposal-original-gate-price-tooltip ${data.main_proposal_original_gate_price.expired_price_class} js-main-original-price">
                        <span class="tooltip-price-wrap">
                            ${data.main_proposal_original_gate_price.price}
                            <span class="currency-code ${data.main_proposal_original_gate_price.currency}"> ${data.main_proposal_original_gate_price.currency_text} </span>
                        </span>
                    </div>
                ` : ``}

            </a>
            ${data.airline_without_price ? `
                <a href="${data.airline_without_price.deeplink}" target="_blank"
                   class="clearfix ticket-proposals js-proposal-link airline-proposal"
                   data-metainfo="${data.airline_without_price.metainfo}" data-original-index="1"
                   data-ticket-index="${data.airline_without_price.ticket_index}" data-proposal-index="1">
                        <span class="left proposal-name" title="${data.airline_without_price.name}">
                            ${data.airline_without_price.name}
                            <span class="ticket-proposals-border-bottom"></span>
                        </span>
                </a>
            ` : ``}
            ${data.proposals.map(proposal => `
                <a href="${proposal.deeplink}" target="_blank"
                   class="clearfix ticket-proposals js-proposal-link ${proposal.airline_proposal}"
                   proposal.metainfo="${proposal.metainfo}" proposal.original-index="${proposal.original_index}"
                   proposal.ticket-index="${proposal.ticket_index}" proposal.proposal-index="${proposal.proposal_index}">
                    <span class="left proposal-name" title="${proposal.name}">${proposal.name}</span>
                        <span class="right price-container--${proposal.currency}">
                            <span class="button-price">${proposal.price}
                                <span class="currency-code ${proposal.currency}"></span>
                            </span>
                        </span>
                        <span class="hidden">
                            <!-- Dafuque is that? -->
                            ${proposal.original_gate_price ? `
                                <div class="poposal-original-gate-price-tooltip">
                                    <span class="tooltip-price-wrap">${proposal.price}
                                        <span class="currency-code ${proposal.currency}"> ${proposal.currency_text} </span>
                                    </span>
                                </div>
                            ` : ``}
                        </span>
                    <span class="ticket-proposals-border-bottom"></span>
                </a>
            `).join(``)}
            ${data.proposals_count ? `
                <span data-index="${data.proposals_count.ticket_index}"
                      class="js-more-proposals ticket-proposals more-proposals">${data.proposals_count.value}</span>
            ` : ``}
        </div>

        <div class="ticket-info-block">

            <div class="ticket-main-info js-ticket-info" data-index="${data.index}">
                <div class="ticket-top-block">
                    <!-- Main Airline logo -->
                    <a class="js-logo-button" href="${data.logo_deeplink}" data-metainfo="${data.logo_metainfo}"
                       target="_blank" data-ticket-index="${data.index}" data-proposal-index="${data.logo_proposal_index}">
                        <img class="main-airline-logo js-ticket-logo"
                             src="${'http://pics.avs.io/112/50/' + data.carrier_code + '@2x.png'}" width="112"
                             height="50"/>
                    </a>
                    <!--  ¯\_(ツ)_/¯ -->
                    <div class="top-info">
                        ${data.change_airports ? `
                            <div class="change-airports-label">
                                <div class="icon icon-change"></div>
                                <span class="name g-uppercase semibold">Change airports</span>
                            </div>
                        ` : ``}
                        ${data.best_by ? `
                            <div class="best-ticket-label ${data.best_by}">
                                <div class="icon icon-label-corner"></div>
                                <span class="name g-uppercase semibold">${data.best_ticket_label}</span>
                            </div>
                        ` : ``}

                    </div>
                </div>
                <div class="ticket-segments">
                    ${data.segments.map(segment => `
                        <div class="segment-block">
                            <div class="flight-depart-info">
                                <div class="flight-place-title">
                                    <span class="semibold">${segment.mini.departure_iata}</span>
                                    &nbsp;
                                    <span>${segment.mini.departure_name}</span>
                                </div>
                                <div class="flight-date-time">
                                    <div class="flight-time">${segment.mini.depart_time}</div>
                                    <div class="flight-date-wrapper">
                                        ${segment.mini.depart_meridiem ? `
                                            <p class="meridiem semibold">${segment.mini.depart_meridiem}</p>
                                        ` : ``}
                                        <p class="flight-date">${segment.mini.depart_date}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="flight-duration-info">
                                <div class="stops-info ${segment.mini.stop_text_class}">${segment.mini.stops_info}</div>
                                <div class="icon icon-departing-plane"></div>
                                <div class="flight-duration">${segment.mini.duration}</div>
                            </div>

                            <div class="flight-arrive-info">
                                <div class="flight-place-title">
                                    <span>${segment.mini.arrival_name}</span>
                                    &nbsp;
                                    <span class="semibold">${segment.mini.arrival_iata}</span>
                                </div>
                                <div class="flight-date-time">
                                    <div class="flight-date-wrapper">
                                        ${segment.mini.arrival_meridiem ? `
                                            <div class="meridiem semibold">${segment.mini.arrival_meridiem}</div>
                                        ` : ``}
                                        <div class="flight-date">${segment.mini.arrival_date}</div>
                                    </div>
                                    <div class="flight-time">${segment.mini.arrival_time}</div>
                                </div>
                            </div>
                        </div>
                    `).join(``)}
                </div>
                <div class="open-ticket-button ${data.opened_class} js-open-ticket-button">
                    <div class="open-ticket-arrow"></div>
                </div>
                ${data.ticket_google_tag ? `
                    <div class="js-ticket-tag" id="${data.div_id}"></div>
                ` : ``}
            </div>
            <div class="ticket-details ${data.opened_class}">
                ${data.segments.map(segment => `
                    <div class="segment-container">
                        <div class="direction-title">
                            ${segment.direction_text}
                        </div>
                        <div class="segment-flights ${segment.direction_class} ${segment.mini.stop_text_class}">

                            ${segment.flights.map(flight => `
                                ${flight.stop ? `
                                    <div class="flight-stop clearfix">
                                        <div class="flight-stop-icon ${flight.stop.icon}"></div>
                                        ${flight.stop.change_airports ? `
                                            <div class="flight-layover-airport semibold left">
                                                <div class="icon icon-change"></div>
                                                ${'Airport_change ' + flight.stop.change_airports.arrival_airport}
                                                <div class="icon icon-direction-arrow"></div>${flight.stop.change_airports.depart_airport}
                                            </div>
                                        ` : ``}
                                        ${flight.stop.same_airport_layover ? `
                                            <div class="flight-layover-airport semibold left">${'Stop at ' + flight.stop.same_airport_layover.title}</div>
                                        ` : ``}
                                        <div class="flight-duration semibold right">
                                            ${flight.stop.duration}
                                        </div>
                                    </div>
                                ` : ``}

                                <div class="flight-flight.>
                                    <div class="airline-info clearfix">
                                        <div class="airline-logo-container left">
                                            <img class="airline-logo-image js-ticket-logo" width="32" height="32"
                                                 src="${'http://pics.jetradar.com/al_square/32/32/' + flight.carrier_code + '@2x.png'}"/>
                                        </div>
                                        <div class="airline-details left">
                                            <span class="semibold">${flight.carrier_name}</span>
                                            <span class="middot">&middot;</span>
                                            <span> ${flight.carrier_number} </span>
                                            ${flight.legroom ? `
                                                <div class="legroom">
                                                    Legroom&nbsp;${flight.legroom}&nbsp;cm
                                                </div>
                                            ` : ``}
                                        </div>
                                        <div class="airline-features right">
                                            ${flight.wifi ? `
                                                <div class="icon icon-wifi">
                                                    <svg width="26px" height="26px" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                        <defs></defs>
                                                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <g id="Oval-5-+-Group" transform="translate(1.000000, 1.000000)">
                                                                <circle id="Oval-5" stroke="#DEE4EA" fill="#FFFFFF" cx="12" cy="12" r="12"></circle>
                                                                <g id="Group" transform="translate(6.000000, 7.000000)" fill="#464A4D">
                                                                    <path d="M11.1135,3.72 C10.9171875,3.72 10.720875,3.6451875 10.5710625,3.4951875 C9.3500625,2.2741875 7.726875,1.601625 6,1.601625 C4.2733125,1.601625 2.64975,2.274 1.42875,3.495 C1.129125,3.7948125 0.6435,3.7948125 0.343875,3.495 C0.04425,3.1955625 0.04425,2.7099375 0.343875,2.4103125 C1.85475,0.899625 3.8634375,0.0676875 6,0.0676875 C8.1365625,0.0676875 10.14525,0.8998125 11.6559375,2.4105 C11.9555625,2.710125 11.9555625,3.19575 11.6559375,3.4951875 C11.5063125,3.645 11.3098125,3.72 11.1135,3.72 L11.1135,3.72 Z" id="Shape"></path>
                                                                    <path d="M3.6136875,6.0699375 C3.417375,6.0699375 3.2210625,5.995125 3.07125,5.8455 C2.771625,5.5456875 2.771625,5.06025 3.07125,4.760625 C3.8990625,3.932625 4.9996875,3.476625 6.1704375,3.476625 C7.3411875,3.476625 8.441625,3.932625 9.269625,4.760625 C9.56925,5.06025 9.56925,5.545875 9.2694375,5.8455 C8.9698125,6.14475 8.4841875,6.1449375 8.18475,5.8453125 C7.6468125,5.3071875 6.931125,5.0109375 6.1704375,5.0109375 C5.409375,5.0109375 4.693875,5.3071875 4.1559375,5.8453125 C4.0063125,5.995125 3.81,6.0699375 3.6136875,6.0699375 L3.6136875,6.0699375 Z" id="Shape"></path>
                                                                    <path d="M6.184125,10.0914375 C5.34825,10.0914375 4.668,9.4111875 4.668,8.575125 C4.668,7.7390625 5.34825,7.058625 6.184125,7.058625 C7.020375,7.058625 7.700625,7.7390625 7.700625,8.575125 C7.700625,9.4111875 7.020375,10.0914375 6.184125,10.0914375 L6.184125,10.0914375 Z" id="Shape"></path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div class="tooltip default top tooltip-airline-feature wifi">
                                                    <div class="tooltip-title">
                                                        Wi-Fi
                                                    </div>
                                                </div>
                                            ` : ``}
                                            ${flight.laptopPower ? `
                                                <div class="icon icon-laptop-power">
                                                    <svg width="26px" height="26px" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                        <defs></defs>
                                                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <g id="Group" transform="translate(1.000000, 1.000000)">
                                                                <circle id="Oval-5" stroke="#DEE4EA" fill="#FFFFFF" cx="12" cy="12" r="12"></circle>
                                                                <path d="M8,10 L16,10 L16,12 C16,13.1045695 15.1132936,14 14.0018986,14 L9.99810135,14 C8.89458045,14 8,13.1122704 8,12 L8,10 Z M11,15 L13,15 L13,18 L11,18 L11,15 Z M10,7.49538898 C10,7.2217932 10.2319336,7 10.5,7 C10.7761424,7 11,7.2157526 11,7.49538898 L11,10 L10,10 L10,7.49538898 Z M13,7.49538898 C13,7.2217932 13.2319336,7 13.5,7 C13.7761424,7 14,7.2157526 14,7.49538898 L14,10 L13,10 L13,7.49538898 Z" id="Rectangle-188" fill="#464A4D"></path>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div class="tooltip default top tooltip-airline-feature">
                                                    <div class="tooltip-title">
                                                        Laptop power
                                                    </div>
                                                </div>
                                            ` : ``}
                                        </div>
                                    </div>
                                    <div class="flight.info">

                                        <div class="flight.depart">
                                            <div class="flight.info-title semibold">
                                                ${flight.depart_iata}
                                            </div>
                                            <div class="flight.info-name g-text-overflow">
                                                ${flight.depart_airport}
                                            </div>
                                            <div class="flight.info-date">
                                                <span class="time semibold">
                                                    ${flight.depart_time}
                                                </span>
                                                &nbsp;
                                                <span class="date">
                                                    ${flight.depart_date}
                                                </span>
                                            </div>
                                            <div class="icon icon-plane"></div>
                                        </div>
                                        <div class="flight.arrive">
                                            <div class="flight.info-title semibold">
                                                ${flight.arrival_iata}
                                            </div>
                                            <div class="flight.info-name g-text-overflow">
                                                ${flight.arrival_airport}
                                            </div>
                                            <div class="flight.info-date">
                                                <span class="time semibold">
                                                    ${flight.arrival_time}
                                                </span>
                                                &nbsp;
                                                <span class="date">
                                                    ${flight.arrival_date}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="flight.duration">
                                            <div class="flight.info-title">&nbsp;</div>
                                            <div class="flight.info-name g-text-overflow">
                                                Duration
                                            </div>
                                            <div class="flight.info-date semibold">${flight.duration}</div>
                                        </div>
                                    </div>

                                </div>
                            `).join(``)}
                        </div>
                    </div>
                `).join(``)}
            </div>
        </div>
        <div class="ticket-sharing-block ${data.opened_class}">
            <div class="copy-link-text js-copy-link-text">Share link</div>
            <input type="text" class="copy-link-input js-copy-link-input" readonly="readonly" value="${data.url}"/>
        </div>
    </div>
</div>
  `;
}