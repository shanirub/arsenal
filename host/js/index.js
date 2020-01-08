$(function(){
	$today_prem_events = $('#today_prem_events');
	$yesterday_prem_events = $('#yesterday_prem_events');
	$next_prem_events = $('#next_prem_events');

	function create_next_premier_events(v){

		const date = new Date();
		const today = date.getFullYear() + "-" + ("0" + date.getMonth()+2).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
		const yesterday_day = new Date(date.setDate(date.getDate()-1));
		const tomorrow_day = new Date(date.setDate(date.getDate()+2));
		const yesterday = yesterday_day.getFullYear() + "-" + ("0" + yesterday_day.getMonth()+2).slice(-2) + "-" + ("0" + yesterday_day.getDate()).slice(-2);
		const tomorrow = tomorrow_day.getFullYear() + "-" + ("0" + tomorrow_day.getMonth()+2).slice(-2) + "-" + ("0" + tomorrow_day.getDate()).slice(-2);

		if(today == v.dateEvent){
			$today_prem_events.append(`<li class="list-group-item ">${v.dateEvent}  Time: ${v.strTimeLocal}</li>`);
			$today_prem_events.append(`<li class="list-group-item ">${v.strHomeTeam}</li>`);
			$today_prem_events.append(`<li class="list-group-item ">${v.strAwayTeam}</li>`);
			$today_prem_events.append(`<li class="list-group-item ">${v.intRound}</li>`);
		}else if(yesterday == v.dateEvent){
			$yesterday_prem_events.append(`<li class="list-group-item ">${v.dateEvent}  Time: ${v.strTimeLocal}</li>`);
			$yesterday_prem_events.append(`<li class="list-group-item ">${v.strHomeTeam}</li>`);
			$yesterday_prem_events.append(`<li class="list-group-item ">${v.strAwayTeam}</li>`);
			$yesterday_prem_events.append(`<li class="list-group-item ">${v.intRound}</li>`);
		}else if (tomorrow == v.dateEvent){
			$next_prem_events.append(`<li class="list-group-item ">${v.dateEvent}  Time: ${v.strTimeLocal}</li>`);
			$next_prem_events.append(`<li class="list-group-item ">${v.strHomeTeam}</li>`);
			$next_prem_events.append(`<li class="list-group-item ">${v.strAwayTeam}</li>`);
			$next_prem_events.append(`<li class="list-group-item ">${v.intRound}</li>`);
		}
		/*
		hom(v.strHomeTeam);
		
		$.ajax({
			type: 'GET',
			url: `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${v.strAwayTeam}`,
			success: function(data){
				$.each(data, function(key, val){
					//away_val = val.strTeamBadge
				});	
			}
		});

		*/
		//$today_prem_events.append(`<li class="list-group-item list-group-item-dark"><img src="${home[0].strTeamBadge}" height="42" width="42"> ${v.strEvent}<img src="${v.strAwayTeam == logo[0].strTeam ? logo[0].strTeamBadge : logo[0].strTeamBadge}" height="42" width="42"></li>`);
		
		//$logo.append(`<img src="${value[0].strTeamBadge}" height="42" width="42">`)
		
	}

	function hom(team){
		let log;
		$.ajax({
			type: 'GET',
			url: `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${team}`,
			success: function(data){
				$.each(data, function(key, val){
					console.log(val[0].strTeamBadge)
				});	
			}
		});
	}

	$.ajax({
		type: 'GET',
		url: `https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328`,
		success: function(data){
			$.each(data, function(key, value){
				$.each(value, function(k, v){
					create_next_premier_events(v);
				});
			});	
		},
		error: function(e){
			alert('error loading');
			console.log(e);
		}
	});
});