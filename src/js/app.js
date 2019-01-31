import $ from 'jquery';

require('webpack-jquery-ui');
import '../css/styles.css';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function() {
  "use strict"; // https://lucybain.com/blog/2014/js-use-strict/

  // Referens internt i modulen för DOM element
  let DOM = {};

  /* =================== Privata metoder nedan ================= */
  function captureDOMEls() {
    DOM.$board = $('.board');
    DOM.$listDialog = $('#list-creation-dialog');
    DOM.$columns = $('.column');
    DOM.$lists = $('.list');
    DOM.$cards = $('.card');
    DOM.$listcards = $('.list-cards');
    
    
    DOM.$newListButton = $('button#new-list');
    DOM.$deleteListButton = $('.list-header > button.delete');

    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.card > button.delete');

    // Own Captures
    DOM.$listcolumns = $('.listz')
    DOM.$newListForm = $('form.new-list');
  }

  function createTabs() {}
  function createDialogs() {}

  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  */
  function bindEvents() {
    /* DOM.$newListButton.on('click', createList); */
    DOM.$deleteListButton.on('click', deleteList);

    DOM.$newCardForm.on('submit', createCard);
    DOM.$deleteCardButton.on('click', deleteCard);
    
    // Own Binds
    DOM.$newListForm.on('submit', createList);
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList(event) {
    event.preventDefault();
    
    console.log("This should create a new list");
    /* let myShinyNewDiv = $('<div class="column">');
    myShinyNewDiv.html('<div class="list"');
    $(DOM.$board).append(myShinyNewDiv);
    var a = $('#selector').html();
    var b = $('#selector').html(a); */
   
    /* let myOtherDiv = $('<div class ="column listz">').html(DOM.$listcolumns);
    $(DOM.$board).append(myOtherDiv); */
    var newList = $(this).closest(DOM.$listcolumns).clone(true, true);
    console.log(newList);
    $(newList).prependTo(DOM.$board);

    
    
    /* $(DOM.$listcolumns).clone(true, true).prependTo(DOM.$board);
    let listInput = $('form :input').val(); */
    /* console.log(listInput);  */
   
    
  }

  function deleteList() {
    console.log("This should delete the list you clicked on");
    
    var clicked = $(this);
    $(this).closest('.list').remove();
   
  }

  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    event.preventDefault();
    console.log("This should create a new card");
    
    
    let cardInput = $('form :input').val();
  
    let newCard = $('<li class="card">' + cardInput + '<button class="button delete">X</button><li>');
    
    // Lägg till click event på nyskapade element
    newCard.on('click', deleteCard);
  
    $(newCard).delegate().prependTo($(this).closest('ul'));
    
    
    
    console.log(cardInput);
    
    
  
  }

  function deleteCard() {
    console.log("This should delete the card you clicked on");
    
    var clicked = $(this);
    $(this).closest('li').remove();
  }

  // Metod för att rita ut element i DOM:en
  function render() {}

  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ::::');
    // Förslag på privata metoder
    captureDOMEls();
    createTabs();
    createDialogs();

    bindEvents();
  }

  // All kod här
  return {
    init: init
  };
})();

//usage
$("document").ready(function() {
  jtrello.init();
});
