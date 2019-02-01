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

  // Globala variabler
  

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
    DOM.$listcolumns = $('.onelist')
    DOM.$newListForm = $('form.new-list');
    DOM.$showDialog = $('.buttonShowDialog');
    DOM.$hideDialog = $('.hideDialog');
    DOM.$session = $('.buttonSession');
    DOM.$archive = $('.buttonArchive');
    DOM.showArchive = $('.showArchive');
    DOM.gameOver = $('.buttonOver');
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
    /* DOM.$cards.on('click', showDialog); */
    DOM.$showDialog.on('click', showDialog );
    DOM.$hideDialog.on('click', hideDialog );
    DOM.$session.on('click', sessioncome);
    DOM.$archive.on('click', archiveCard);
    DOM.showArchive.on('click', showArchive);
    DOM.gameOver.on('click', gameOver);
    
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
   /*  let listInput = $('form :input').val(); 
    console.log(listInput); 
    console.log(DOM.$listcolumns);
    $(this).closest(DOM.$listcolumns).css('background', 'yellow'); */


   /* let newList = $('form').closest(DOM.$listcolumns).clone(true, true);

    
    $(newList).prependTo(DOM.$board); */
    let lastListItem = $(DOM.$listcolumns).last().clone(true, true);
    $(lastListItem).prependTo(DOM.$board);
    console.log(lastListItem);
    
    /* $(DOM.$listcolumns).clone(true, true).prependTo(DOM.$board); */
    /* let listInput = $('form :input').val(); 
    console.log(listInput);  */
   
    
  }

  function createCard(event) {
    event.preventDefault();
    console.log("This should create a new card");

    // Get dateinfo
    let dateInfo = $('input[name=datepicker]').val();
    
    
    
    let cardInput = $('form :input').val();
    console.log(cardInput);
    let newCard = $('<li class="card">' + cardInput + dateInfo + ' ' + '<button class="button delete">X</button>  <button class="buttonArchive">Archive</button><li>');
    
    // Lägg till click event på nyskapade element
   /*  newCard.on('click', deleteCard); */
    newCard.on('click', archiveCard);
  
    $(newCard).prependTo($(this).closest('ul')); // lägg till delegate()
    
    /* newCard = undefined; */
    
    
  }

  function deleteList() {
    console.log("This should delete the list you clicked on");
    
    
    $(this).closest('.list').remove();
  }

  /* =========== Metoder för att hantera kort i listor nedan =========== */
  /* $( document ).click(function() {
    $( ".list" ).toggle( "explode" );
  }); */

  function deleteCard(event) {
    console.log("This should delete the card you clicked on");
    
    
    $(this).closest('li').remove();
    $(event.target).closest('.card').toggle( "explode" );
    /* $(".list").toggle("explode") */
    
  }

  // Metod för att rita ut element i DOM:en
  function render() {}

  function sortableElements() {

      $('.listContainer').sortable({
        connectWith: 'onelist',
        containment: "parent",
        forcePlaceholderSize: true
      })

      $('.list-cards').sortable({
        connectWith: 'ul'
      });
   
  }

 /*  $('.dialog').dialog({
    autoOpen: false
  }); */
  function createTabs() {
    $( ".dialog" ).tabs();
  }
  
  function dialogElements() {
    $( ".dialog" ).dialog({
      autoOpen: false,
    });
  }

  function showDialog() {
   /*  $('.buttonShowDialog').dialog( "option", "autoOpen", true ); */
    $( ".dialog" ).dialog({
      autoOpen: true,
    });
  }
  
  function datePick() {
    $('.datepick').each(function(){
      $(this).datepicker({
        altField: ".calender"
      });
  });
  }

  function hideDialog() {
    $(this).closest('.dialog').hide();
   /*  $('.ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle').css("display", "none");  */
  }

  function storeSessions() {
    var htmlContents = document.documentElement.innerHTML;
    console.log(htmlContents);

    localStorage.setItem('myBook', JSON.stringify(htmlContents ));
  }

  function sessioncome() {
    var hej = localStorage.getItem('myBook');
    console.log(hej);
  }

  function archiveCard() {
    $(this).closest('.card').appendTo('.thearchive');
  }

  function showArchive() {
    $('.thearchive' ).toggle('slow');
   
  }

  function gameOver() {
   
      $( ".board" ).toggle( "explode" );

  }
  

  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ::::');
    // Förslag på privata metoder
    captureDOMEls();
    createTabs();
    bindEvents();

    // egna
    sortableElements();
    createDialogs();
    dialogElements();
    datePick();
    createTabs();
    storeSessions();
   
    
    
    
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
