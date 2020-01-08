$(function(){
	$title = $('#title');
	$web = $('#web');
	$face = $('#face');
	$description = $('#description');
	$stad = $('#stad');
	$stad_des = $('#stad_des');
	$logo = $('#logo');
	$win = $('#win');
	$players = $('#players')
	$next_event = $('#next_event')
	$last_event = $('#last_event')

	var getUrlParameter = function getUrlParameter(sParam) {
		var sPageURL = window.location.search.substring(1),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;
	
		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');
	
			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
			}
		}
	}

	var team = getUrlParameter('team');

	function create_player(v){
		$players.append('<tr>');
		$players.append(`<td><img src="${v.strThumb}" height="42" width="42"></td>`);
		$players.append('<td>'+v.strPlayer+'</td>');
		$players.append('<td>'+v.dateBorn+'</td>');
		$players.append('<td>'+v.strNationality+'</td>');
		$players.append('<td>'+v.strNumber+'</td>');
		$players.append('<td>'+v.strPosition+'</td>');
		$players.append('</tr>');
	}

	$.ajax({
		type: 'GET',
		url: `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${team}`,
		success: function(data){
			$.each(data, function(key, value){
				$title.append(value[0].strTeam);
				$face.append(value[0].strFacebook);
				$web.append(value[0].strWebsite);
				$description.append(value[0].strDescriptionEN);
				$stad.append(value[0].strStadium);
				$stad_des.append(value[0].strStadiumDescription);
				$logo.append(`<img src="${value[0].strTeamBadge}" height="42" width="42">`);
				$win.append(`<img src="${value[0].strTeamFanart1}" height="auto" width="100%">`)
			});	
		},
		error: function(e){
			alert('error loading');
			console.log(e);
		}
	});

	$.ajax({
		type: 'GET',
		url: `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=${team}`,
		success: function(data){
			$.each(data, function(key, value){
				team_id = value[0].idTeam;
				next_event(team_id);
				last_event(team_id);
				$.each( value, function( k, v){
					create_player(v);
				});
			});	
		},
		error: function(e){
			alert('error loading');
			console.log(e);
		}
	});

	function next_event(team_id){
		$.ajax({
			type: 'GET',
			url: `https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${team_id}`,
			success: function(data){
				$.each(data, function(key, value){
					$next_event.append(`<div class="col"><li class="list-group-item list-group-item-dark">${value[0].strEvent}</li><li class="list-group-item">${value[0].dateEvent}</li></div>`);
					$next_event.append(`<div class="col"><li class="list-group-item list-group-item-dark">${value[1].strEvent}</li><li class="list-group-item">${value[1].dateEvent}</li></div>`);
					$next_event.append(`<div class="col"><li class="list-group-item list-group-item-dark">${value[2].strEvent}</li><li class="list-group-item">${value[2].dateEvent}</li></div>`);
					$next_event.append(`<div class="col"><li class="list-group-item list-group-item-dark">${value[3].strEvent}</li><li class="list-group-item">${value[3].dateEvent}</li></div>`);
					return false;
				});	
			},
			error: function(e){
				alert('error loading');
				console.log(e);
			}
		});	
	};

	function last_event(team_id){
		$.ajax({
			type: 'GET',
			url: `https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=${team_id}`,
			success: function(data){
				$.each(data, function(key, value){
					$last_event.append(`<div class="col"><li class="list-group-item list-group-item-dark">${value[0].strEvent}</li><li class="list-group-item">${value[0].intHomeScore} - ${value[0].intAwayScore}</li></div>`);
					$last_event.append(`<div class="col"><li class="list-group-item list-group-item-dark">${value[1].strEvent}</li><li class="list-group-item">${value[1].intHomeScore} - ${value[1].intAwayScore}</li></div>`);
					$last_event.append(`<div class="col"><li class="list-group-item list-group-item-dark">${value[2].strEvent}</li><li class="list-group-item">${value[2].intHomeScore} - ${value[2].intAwayScore}</li></div>`);
					$last_event.append(`<div class="col"><li class="list-group-item list-group-item-dark">${value[3].strEvent}</li><li class="list-group-item">${value[3].intHomeScore} - ${value[3].intAwayScore}</li></div>`);
					return false;
				});	
			},
			error: function(e){
				alert('error loading');
				console.log(e);
			}
		});	
	}
});