$(function(){
	$Premier_teams = $('#Premier_teams');
	$league1_teams = $('#league1_teams');
	$league2_teams = $('#league2_teams');
	$standing = $('#standing');
	$next_events = $('#next_events');
	$last_events = $('#last_events');
	$description = $('#description')

	function create_table(k,v){
		$standing.append('<tr>');
		$standing.append(`<td>${k+1}</td>`);
		$standing.append(`<td>${v.name}</td>`);
		$standing.append(`<td>${v.played}</td>`);
		$standing.append(`<td>${v.win}</td>`);
		$standing.append(`<td>${v.draw}</td>`);
		$standing.append(`<td>${v.loss}</td>`);
		$standing.append(`<td>${v.goalsfor}</td>`);
		$standing.append(`<td>${v.goalsagainst}</td>`);
		$standing.append(`<td>${v.goalsdifference}</td>`);
		$standing.append(`<td>${v.total}</td>`);
		$standing.append('</tr>');
	};

	function create_next_events(v){
		$next_events.append(`<li class="list-group-item list-group-item-dark"><i class="material-icons">sports_soccer</i><div class="pad">${v.strEvent}</div></li>`);
		$next_events.append(`<li class="list-group-item "><i class="material-icons">event</i><div class="pad">${v.dateEvent}  Time: ${v.strTimeLocal}</div></li>`);
		$next_events.append(`<li class="list-group-item "><i class="material-icons">home</i><div class="pad">${v.strHomeTeam}</div></li>`);
		$next_events.append(`<li class="list-group-item "><i class="material-icons">card_travel</i><div class="pad">${v.strAwayTeam}</div></li>`);
		$next_events.append(`<li class="list-group-item "><i class="material-icons">notification_important</i><div class="pad">${v.intRound}</div></li>`);
	};

	function create_last_events(v){
		$last_events.append(`<li class="list-group-item list-group-item-dark"><i class="material-icons">sports_soccer</i><div class="pad">${v.strEvent}</div></li>`);
		$last_events.append(`<li class="list-group-item "><i class="material-icons">assignment</i><div class="pad">${v.intHomeScore} - ${v.intAwayScore}</div></li>`);
		$last_events.append(`<li class="list-group-item "><i class="material-icons">home</i><div class="pad">${v.strHomeTeam}</div></li>`);
		$last_events.append(`<li class="list-group-item "><i class="material-icons">card_travel</i><div class="pad">${v.strAwayTeam}</div></li>`);
		$last_events.append(`<li class="list-group-item "><i class="material-icons">notification_important</i><div class="pad">${v.intRound}</div></li>`);
	}

	function get_premier(value) {
		$Premier_teams.append(`<li class="list-group-item"><a href="team.html?team=${value.strTeam}">${value.strTeam}</a></li>`);
	};

	function get_league1_teams(value){
		$league1_teams.append(`<li class="list-group-item"><a href="team.html?team=${value.strTeam}">${value.strTeam}</a></li>`);
	};

	function get_league2_teams(value){
		$league2_teams.append(`<li class="list-group-item"><a href="team.html?team=${value.strTeam}">${value.strTeam}</a></li>`);
	};

	$.ajax({
		type: 'GET',
		url: 'https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English%20Premier%20League',
		success: function(data){
			$.each(data, function(key, value){
				$.each(value, function(k, v){
					get_premier(v);
				});
			});	
		},
		error: function(e){
			alert('error loading');
			console.log(e);
		}
	});

	$.ajax({
		type: 'GET',
		url: `https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English League 1`,
		success: function(data){
			$.each(data, function(key, value){
				$.each(value, function(k, v){
					get_league1_teams(v);
				});
			});	
		},
		error: function(e){
			alert('error loading');
			console.log(e);
		}
	});

	$.ajax({
		type: 'GET',
		url: `https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English League 2`,
		success: function(data){
			$.each(data, function(key, value){
				$.each(value, function(k, v){
					get_league2_teams(v);
				});
			});	
		},
		error: function(e){
			alert('error loading');
			console.log(e);
		}
	});

	$.ajax({
		type: 'GET',
		url: `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=4328&s=1920`,
		success: function(data){
			$.each(data, function(key, value){
				$.each(value, function(k, v){
					create_table(k,v);
				});
			});	
		},
		error: function(e){
			alert('error loading');
			console.log(e);
		}
	});

	$.ajax({
		type: 'GET',
		url: `https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328`,
		success: function(data){
			$.each(data, function(key, value){
				$.each(value, function(k, v){
					create_next_events(v);
				});
			});	
		},
		error: function(e){
			alert('error loading');
			console.log(e);
		}
	});

	$.ajax({
		type: 'GET',
		url: `https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4328`,
		success: function(data){
			$.each(data, function(key, value){
				$.each(value, function(k, v){
					create_last_events(v);
				});
			});	
		},
		error: function(e){
			alert('error loading');
			console.log(e);
		}
	});

	$.ajax({
		type: 'GET',
		url: `https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=4328`,
		success: function(data){
			$.each(data, function(key, value){
				$.each(value, function(k, v){
					$description.append(`<li class="list-group-item">${v.strDescriptionEN}</li>`);
					$description.append(`<li class="list-group-item"><img src="${v.strFanart2}" height="auto" width="100%"></li>`);
				});
			});	
		},
		error: function(e){
			alert('error loading');
			console.log(e);
		}
	});
});