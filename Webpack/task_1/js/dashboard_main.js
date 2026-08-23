import $ from 'jquery';
import _ from 'lodash';

// Ajout des éléments au body
$('body').append('<p>Holberton Dashboard</p>');
$('body').append('<p>Dashboard data for the students</p>');
$('body').append('<button>Click here to get started</button>');
$('body').append("<p id='count'></p>");
$('body').append('<p>Copyright - Holberton School</p>');

// Gestion du compteur
let count = 0;

function updateCounter() {
  count += 1;
  $('#count').text(`${count} clicks on the button`);
}

// Liaison de l'événement click avec debounce (500 ms)
$('button').on('click', _.debounce(updateCounter, 500));
