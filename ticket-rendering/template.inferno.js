var Inferno = require('inferno');

var ChildrenTypes = Inferno.ChildrenTypes;
var createVFragment = Inferno.createVFragment;
var createVPlaceholder = Inferno.createVPlaceholder;
var createVText = Inferno.createVText;

module.exports = function (data) {
	if (!data) {
		return createVPlaceholder();
	}
	return (
		<div className="ticket-outer-wrap" data-rating={data.ticket_rating}>
			{data.highlight_info ?
				<div className={"highlight-plate " + data.highlight_info.plate_className} childrenType={ ChildrenTypes.NON_KEYED }>
					{data.highlight_info.text}
					<span className="inline-block" childrenType={ ChildrenTypes.NON_KEYED }>
						{ createVText(data.highlight_info.price_in_currency) }
						&nbsp;
						<span className={"currency-code " + data.highlight_info.currency}></span>
					</span>
				</div>
				: createVPlaceholder()}
			<div className={"ticket js-ticket " + [data.ticket_type_className, data.highlight_className, data.highlight_info.plate_className, data.opened_className, data.expired_className].join(' ') } data-index={data.index} childrenType={ ChildrenTypes.NON_KEYED }>
				<div className="ticket-buy-block">
					<a className="js-buy-button" data-metainfo={data.main_proposal.metainfo} data-ticket-index={data.index} href={data.main_proposal.deeplink} target="_blank" childrenType={ ChildrenTypes.NON_KEYED }>
						<div className={"price-block " + data.expired_price_className} childrenType={ ChildrenTypes.NODE }>
							<span className="ticket-main-price" childrenType={ ChildrenTypes.TEXT }>
								{data.main_proposal.price}
							</span>
						</div>
						<button className="button ticket-buy-button orange-button" childrenType={ ChildrenTypes.NON_KEYED }>
							<div className="semibold book-now" childrenType={ ChildrenTypes.TEXT }>
								{data.main_button_text}
							</div>
							<div className="main-proposal-name" childrenType={ ChildrenTypes.TEXT }>{ 'Buy on &nbsp;' + data.main_proposal.name}</div>
						</button>

						{data.main_proposal_original_gate_price ?
							<div className={"poposal-original-gate-price-tooltip " + data.main_proposal_original_gate_price.expired_price_className + " js-main-original-price"} childrenType={ ChildrenTypes.NODE }>
								<span className="tooltip-price-wrap" childrenType={ ChildrenTypes.NON_KEYED }>
									{ createVText(data.main_proposal_original_gate_price.price) }
									<span className={"currency-code " + data.main_proposal_original_gate_price.currency} childrenType={ ChildrenTypes.TEXT }>
										{data.main_proposal_original_gate_price.currency_text}
									</span>
								</span>
							</div>
							: createVPlaceholder()}
					</a>
					{data.airline_without_price ?
						<a href={data.airline_without_price.deeplink} target="_blank"
							className="clearfix ticket-proposals js-proposal-link airline-proposal"
							data-metainfo={data.airline_without_price.metainfo} data-original-index="1"
							data-ticket-index={data.airline_without_price.ticket_index} data-proposal-index="1">
							<span className="left proposal-name" title={data.airline_without_price.name} childrenType={ ChildrenTypes.NON_KEYED }>
								{ createVText(data.airline_without_price.name) }
								<span className="ticket-proposals-border-bottom"></span>
							</span>
						</a>
						: createVPlaceholder()}
					{data.proposals.map(proposal =>
						<a href={proposal.deeplink} target="_blank"	className={"clearfix ticket-proposals js-proposal-link " + proposal.airline_proposal} data-metainfo={proposal.metainfo} data-original-index={proposal.original_index} data-ticket-index={proposal.ticket_index} data-proposal-index={proposal.proposal_index} childrenType={ ChildrenTypes.NON_KEYED }>
							<span className="left proposal-name" title={proposal.name}>{proposal.name}</span>
							<span className={"right price-container--" + proposal.currency} childrenType={ ChildrenTypes.NODE }>
								<span className="button-price" childrenType={ ChildrenTypes.NON_KEYED }>
									{ createVText(proposal.price) }
									<span className={"currency-code " + proposal.currency}></span>
								</span>
							</span>
							<span className="hidden" childrenType={ ChildrenTypes.NODE }>
								{proposal.original_gate_price ?
									<div className="poposal-original-gate-price-tooltip" childrenType={ ChildrenTypes.NODE }>
										<span className="tooltip-price-wrap" childrenType={ ChildrenTypes.NON_KEYED }>
											{ createVText(proposal.price) }
											<span className={"currency-code " + proposal.currency} childrenType={ ChildrenTypes.TEXT }>
												{proposal.currency_text}
											</span>
										</span>
									</div>
									: createVPlaceholder()}
							</span>
							<span className="ticket-proposals-border-bottom"></span>
						</a>
					) }
					{data.proposals_count ?
						<span data-index={data.proposals_count.ticket_index} className="js-more-proposals ticket-proposals more-proposals" childrenType={ ChildrenTypes.TEXT }>
							{data.proposals_count.value}
						</span>
					: createVPlaceholder()}
				</div>

				<div className="ticket-info-block" childrenType={ ChildrenTypes.NON_KEYED }>
					<div className="ticket-main-info js-ticket-info" data-index={data.index}>
						<div className="ticket-top-block" childrenType={ ChildrenTypes.NON_KEYED }>
							<a className="js-logo-button" href={data.logo_deeplink} data-metainfo={data.logo_metainfo} target="_blank" data-ticket-index={data.index} data-proposal-index={data.logo_proposal_index} childrenType={ ChildrenTypes.NODE }>
								<img className="main-airline-logo js-ticket-logo" src={'http://pics.avs.io/112/50/' + data.carrier_code + '@2x.png'} width="112" height="50"/>
							</a>
							<div className="top-info" childrenType={ ChildrenTypes.NON_KEYED }>
								{data.change_airports ?
									<div className="change-airports-label">
										<div className="icon icon-change"></div>
										<span className="name g-uppercase semibold">Change airports</span>
									</div>
									: createVPlaceholder()}
								{data.best_by ?
									<div className={"best-ticket-label " + data.best_by}>
										<div className="icon icon-label-corner"></div>
										<span className="name g-uppercase semibold" childrenType={ ChildrenTypes.TEXT }>{data.best_ticket_label}</span>
									</div>
									: createVPlaceholder()}

							</div>
						</div>
						<div className="ticket-segments" childrenType={ ChildrenTypes.NON_KEYED }>
							{data.segments.map(segment =>
								<div className="segment-block" childrenType={ ChildrenTypes.NON_KEYED }>
									<div className="flight-depart-info" childrenType={ ChildrenTypes.NON_KEYED }>
										<div className="flight-place-title" childrenType={ ChildrenTypes.NON_KEYED }>
											<span className="semibold" childrenType={ ChildrenTypes.TEXT }>{segment.mini.departure_iata}</span>
											&nbsp;
											<span childrenType={ ChildrenTypes.TEXT }>{segment.mini.departure_name}</span>
										</div>
										<div className="flight-date-time" childrenType={ ChildrenTypes.NON_KEYED }>
											<div className="flight-time" childrenType={ ChildrenTypes.TEXT }>{segment.mini.depart_time}</div>
											<div className="flight-date-wrapper" childrenType={ ChildrenTypes.NON_KEYED }>
												{segment.mini.depart_meridiem ?
													<p className="meridiem semibold" childrenType={ ChildrenTypes.TEXT }>{segment.mini.depart_meridiem}</p>
													: createVPlaceholder()}
												<p className="flight-date" childrenType={ ChildrenTypes.TEXT }>{segment.mini.depart_date}</p>
											</div>
										</div>
									</div>

									<div className="flight-duration-info" childrenType={ ChildrenTypes.NON_KEYED }>
										<div className={"stops-info " + segment.mini.stop_text_className} childrenType={ ChildrenTypes.TEXT }>{segment.mini.stops_info}</div>
										<div className="icon icon-departing-plane"></div>
										<div className="flight-duration" childrenType={ ChildrenTypes.TEXT }>{segment.mini.duration}</div>
									</div>

									<div className="flight-arrive-info" childrenType={ ChildrenTypes.NON_KEYED }>
										<div className="flight-place-title" childrenType={ ChildrenTypes.NON_KEYED }>
											<span childrenType={ ChildrenTypes.TEXT }>{segment.mini.arrival_name}</span>
											&nbsp;
											<span className="semibold" childrenType={ ChildrenTypes.TEXT }>{segment.mini.arrival_iata}</span>
										</div>
										<div className="flight-date-time" childrenType={ ChildrenTypes.NON_KEYED }>
											<div className="flight-date-wrapper" childrenType={ ChildrenTypes.NON_KEYED }>
												{segment.mini.arrival_meridiem ?
													<div className="meridiem semibold" childrenType={ ChildrenTypes.TEXT }>{segment.mini.arrival_meridiem}</div>
													: createVPlaceholder()}
												<div className="flight-date" childrenType={ ChildrenTypes.TEXT }>{segment.mini.arrival_date}</div>
											</div>
											<div className="flight-time" childrenType={ ChildrenTypes.TEXT }>{segment.mini.arrival_time}</div>
										</div>
									</div>
								</div>
							) }
						</div>
						<div className={"open-ticket-button " + data.opened_className + " js-open-ticket-button"} childrenType={ ChildrenTypes.NODE }>
							<div className="open-ticket-arrow"></div>
						</div>
						{data.ticket_google_tag ?
							<div className="js-ticket-tag" id={data.div_id}></div>
							: createVPlaceholder()}
					</div>
					<div className={"ticket-details " + data.opened_className} childrenType={ ChildrenTypes.NON_KEYED }>
						{data.segments.map(segment =>
							<div className="segment-container" childrenType={ ChildrenTypes.NON_KEYED }>
								<div className="direction-title" childrenType={ ChildrenTypes.TEXT }>
									{segment.direction_text}
								</div>
								<div className={"segment-flights " + segment.direction_className + " " + segment.mini.stop_text_className} childrenType={ ChildrenTypes.NON_KEYED }>
									{segment.flights.map(flight =>
										<span childrenType={ ChildrenTypes.NON_KEYED }>
											<span childrenType={ ChildrenTypes.NODE }>{flight.stop ?
												<div className="flight-stop clearfix" childrenType={ ChildrenTypes.NON_KEYED }>
													<div className={"flight-stop-icon " + flight.stop.icon}></div>
													{flight.stop.change_airports ?
														<div className="flight-layover-airport semibold left" childrenType={ ChildrenTypes.NON_KEYED }>
															<div className="icon icon-change"></div>
															{ createVText('Airport_change ' + flight.stop.change_airports.arrival_airport) }
															<div className="icon icon-direction-arrow"></div>
															{ createVText(flight.stop.change_airports.depart_airport) }
														</div>
														: createVPlaceholder()}
													{flight.stop.same_airport_layover ?
														<div className="flight-layover-airport semibold left" childrenType={ ChildrenTypes.TEXT }>{'Stop at ' + flight.stop.same_airport_layover.title}</div>
														: createVPlaceholder()}
													<div className="flight-duration semibold right" childrenType={ ChildrenTypes.TEXT }>
														{flight.stop.duration}
													</div>
												</div>
												: createVPlaceholder()}</span>

											<div className="flight-flight" childrenType={ ChildrenTypes.NON_KEYED }>
												<div className="airline-info clearfix" childrenType={ ChildrenTypes.NON_KEYED }>
													<div className="airline-logo-container left" childrenType={ ChildrenTypes.NODE }>
														<img className="airline-logo-image js-ticket-logo" width="32" height="32"
															src={'http://pics.jetradar.com/al_square/32/32/' + flight.carrier_code + '@2x.png'}/>
													</div>
													<div className="airline-details left" childrenType={ ChildrenTypes.NON_KEYED }>
														<span className="semibold" childrenType={ ChildrenTypes.TEXT }>{flight.carrier_name}</span>
														<span className="middot">&middot; </span>
														<span childrenType={ ChildrenTypes.TEXT }>{flight.carrier_number}</span>
														{flight.legroom ?
															<div className="legroom" childrenType={ ChildrenTypes.TEXT }>
																{ 'Legroom&nbsp; ' + flight.legroom + '&nbsp; cm'}
															</div>
															: createVPlaceholder()}
													</div>
													<div className="airline-features right" childrenType={ ChildrenTypes.NON_KEYED }>
														{flight.wifi ?
															<span>
																<div className="icon icon-wifi">
																	<svg width="26px" height="26px" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg">
																		<defs></defs>
																		<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																			<g id="Oval-5-+-Group" transform="translate(1.000000, 1.000000)">
																				<circle id="Oval-5" stroke="#DEE4EA" fill="#FFFFFF" cx="12" cy="12" r="12"></circle>
																				<g id="Group" transform="translate(6.000000, 7.000000)" fill="#464A4D">
																					<path
																						d="M11.1135,3.72 C10.9171875,3.72 10.720875,3.6451875 10.5710625,3.4951875 C9.3500625,2.2741875 7.726875,1.601625 6,1.601625 C4.2733125,1.601625 2.64975,2.274 1.42875,3.495 C1.129125,3.7948125 0.6435,3.7948125 0.343875,3.495 C0.04425,3.1955625 0.04425,2.7099375 0.343875,2.4103125 C1.85475,0.899625 3.8634375,0.0676875 6,0.0676875 C8.1365625,0.0676875 10.14525,0.8998125 11.6559375,2.4105 C11.9555625,2.710125 11.9555625,3.19575 11.6559375,3.4951875 C11.5063125,3.645 11.3098125,3.72 11.1135,3.72 L11.1135,3.72 Z"
																						id="Shape"></path>
																					<path
																						d="M3.6136875,6.0699375 C3.417375,6.0699375 3.2210625,5.995125 3.07125,5.8455 C2.771625,5.5456875 2.771625,5.06025 3.07125,4.760625 C3.8990625,3.932625 4.9996875,3.476625 6.1704375,3.476625 C7.3411875,3.476625 8.441625,3.932625 9.269625,4.760625 C9.56925,5.06025 9.56925,5.545875 9.2694375,5.8455 C8.9698125,6.14475 8.4841875,6.1449375 8.18475,5.8453125 C7.6468125,5.3071875 6.931125,5.0109375 6.1704375,5.0109375 C5.409375,5.0109375 4.693875,5.3071875 4.1559375,5.8453125 C4.0063125,5.995125 3.81,6.0699375 3.6136875,6.0699375 L3.6136875,6.0699375 Z"
																						id="Shape"></path>
																					<path
																						d="M6.184125,10.0914375 C5.34825,10.0914375 4.668,9.4111875 4.668,8.575125 C4.668,7.7390625 5.34825,7.058625 6.184125,7.058625 C7.020375,7.058625 7.700625,7.7390625 7.700625,8.575125 C7.700625,9.4111875 7.020375,10.0914375 6.184125,10.0914375 L6.184125,10.0914375 Z"
																						id="Shape"></path>
																				</g>
																			</g>
																		</g>
																	</svg>
																</div>
																<div className="tooltip default top tooltip-airline-feature wifi">
																	<div className="tooltip-title">Wi-Fi</div>
																</div>
															</span>
															: createVPlaceholder()}
														{flight.laptopPower ?
															<span>
																<div className="icon icon-laptop-power">
																	<svg width="26px" height="26px" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg">
																		<defs></defs>
																		<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																			<g id="Group" transform="translate(1.000000, 1.000000)">
																				<circle id="Oval-5" stroke="#DEE4EA" fill="#FFFFFF"
																					cx="12" cy="12" r="12"></circle>
																				<path
																					d="M8,10 L16,10 L16,12 C16,13.1045695 15.1132936,14 14.0018986,14 L9.99810135,14 C8.89458045,14 8,13.1122704 8,12 L8,10 Z M11,15 L13,15 L13,18 L11,18 L11,15 Z M10,7.49538898 C10,7.2217932 10.2319336,7 10.5,7 C10.7761424,7 11,7.2157526 11,7.49538898 L11,10 L10,10 L10,7.49538898 Z M13,7.49538898 C13,7.2217932 13.2319336,7 13.5,7 C13.7761424,7 14,7.2157526 14,7.49538898 L14,10 L13,10 L13,7.49538898 Z"
																					id="Rectangle-188" fill="#464A4D"></path>
																			</g>
																		</g>
																	</svg>
																</div>
																<div className="tooltip default top tooltip-airline-feature">
																	<div className="tooltip-title">
																		Laptop power
																	</div>
																</div>
															</span>
															: createVPlaceholder()}
													</div>
												</div>
												<div className="flight.info" childrenType={ ChildrenTypes.NON_KEYED }>
													<div className="flight.depart" childrenType={ ChildrenTypes.NON_KEYED }>
														<div className="flight.info-title semibold" childrenType={ ChildrenTypes.TEXT }>
															{flight.depart_iata}
														</div>
														<div className="flight.info-name g-text-overflow" childrenType={ ChildrenTypes.TEXT }>
															{flight.depart_airport}
														</div>
														<div className="flight.info-date" childrenType={ ChildrenTypes.NON_KEYED }>
															<span className="time semibold" childrenType={ ChildrenTypes.TEXT }>
																{flight.depart_time}
															</span>
															&nbsp;
															<span className="date" childrenType={ ChildrenTypes.TEXT }>
																{flight.depart_date}
															</span>
														</div>
														<div className="icon icon-plane"></div>
													</div>
													<div className="flight.arrive" childrenType={ ChildrenTypes.NON_KEYED }>
														<div className="flight.info-title semibold" childrenType={ ChildrenTypes.TEXT }>
															{flight.arrival_iata}
														</div>
														<div className="flight.info-name g-text-overflow" childrenType={ ChildrenTypes.TEXT }>
															{flight.arrival_airport}
														</div>
														<div className="flight.info-date" childrenType={ ChildrenTypes.NON_KEYED }>
															<span className="time semibold" childrenType={ ChildrenTypes.TEXT }>
																{flight.arrival_time}
															</span>
															&nbsp;
															<span className="date" childrenType={ ChildrenTypes.TEXT }>
																{flight.arrival_date}
															</span>
														</div>
													</div>
													<div className="flight.duration" childrenType={ ChildrenTypes.NON_KEYED }>
														<div className="flight.info-title">&nbsp; </div>
														<div className="flight.info-name g-text-overflow">
															Duration
														</div>
														<div className="flight.info-date semibold" childrenType={ ChildrenTypes.TEXT }>{flight.duration}</div>
													</div>
												</div>
											</div>
										</span>
									) }
								</div>
							</div>
						) }
					</div>
				</div>
				<div className={"ticket-sharing-block " + data.opened_className} childrenType={ ChildrenTypes.NON_KEYED }>
					<div className="copy-link-text js-copy-link-text">Share link</div>
					<input type="text" className="copy-link-input js-copy-link-input" readonly="readonly" value={data.url}/>
				</div>
			</div>
		</div>
	);
}
