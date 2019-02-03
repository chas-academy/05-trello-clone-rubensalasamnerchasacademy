import $ from 'jquery';

require('webpack-jquery-ui');
import '../css/styles.css';
import 'jquery-ui/themes/base/all.css';
import { finished } from 'stream';

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
    DOM.$listContainer = $('.listContainer');
  }

 
 
 
  
 
 
 
  function createTabs() {
    $('#tabs').tabs();
  }
  function createDialogs() {
    DOM.$listDialog.dialog('open');
  }

  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  * 
  */

  function bindEvents() {
    DOM.$board.on("click", ".list-header > button.delete", deleteList);
    DOM.$board.on("submit", "form.new-card", createCard);
    DOM.$board.on("click", ".card > button.delete", deleteCard);
   
    
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
    let title = $('input[name="newlist"').val();
   

    let newList = $(`<div class="column">
    <div class="list">
        <div class="list-header">
            <h1>${title}</h1>
            <button class="button delete">X</button>
        </div>
        <ul class="list-cards ui-sortable">
           
            <li class="add-new">
                <form class="new-card" action="index.html">
                    <input type="text" autocomplete="off" name="title" placeholder="Please name the card" />
                    <input type="text" autocomplete="off" name="datepicker" placeholder="Date" class="datepick"/>
                    <button class="button add">Add new card</button>
                </form>
            </li>
        </ul>
    </div>
</div>
`);

   
    
    $('.board').append(newList);
    
   /*  newList = (""); */
    
    datePick();
   
    

    
  }

  function createCard(event) {
    event.preventDefault();
    
    let dateInfo = $($.parseHTML(event.originalEvent.path[0][1].value)).text().trim();
    let cardInput = $($.parseHTML(event.originalEvent.path[0].title.value)).text().trim();
    
    
    let newCard = $('<li class="card ui-sortable-handle">' + cardInput + dateInfo + '<button class="button delete">X</button> <button class="buttonShowDialog">Show Info</button> <button class="buttonArchive">Archive</button><li>');
    
    $(newCard).prependTo($(this).closest('ul')); 
    
    
    sortableElements();
    
 
  }

  function dialogElements () {
    $(".dialog" ).dialog();
    console.log("YAAYAYA");
    /* let dialog = $(`<div class="dialog"><h1>CROUCHING TIGER HIDDEN DRAGON</h1><div>`); */
    $(this).closest('li').addClass('hej');

  }

  function deleteList() {
    console.log("This should delete the list you clicked on");
    
    
    $(this).closest('.column').remove();
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

      $('.board').sortable({
        connectWith: 'column'
        /* containment: "parent",
        forcePlaceholderSize: true */
      });

      $('.list-cards').sortable({
        connectWith: 'list-cards'
      });
   
  }

  function createTabs() {
    $( ".dialog" ).tabs();
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
        /* altField: "'calendar'" */
      });
  });
  /* console.log() $(this).find('.datepick').datepicker() */
 /*  $(this).find('h1').css('color', 'green'); */
 /*  console.log("hi");
  console.log(event);
  let hej = $(this).closest('div');
  console.log(hej); */
  /* $('h1').text('maybe'); */


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
   
    /* $(event.target).closest('.card').toggle("drop"); */ // DROP EFFECT
    $(this).closest('.card').appendTo('.thearchive');
    
  }

  function showArchive() {
    $('.thearchive' ).toggle('slow');
   
  }

  function gameOver() {
   
      $( ".board" ).toggle( "explode" );

  } 

  function sortableElements() {

    $('.board').sortable({
      connectWith: 'column'
      /* containment: "parent",
      forcePlaceholderSize: true */
    });

    $('.list-cards').sortable({
      connectWith: 'list-cards'
    });
    $('.list-cards').sortable({ 
      connectWith: '.list-cards' });
    $('.column').sortable({ 
      connectWith: '.column',
      containment: "parent" });
 
}

 // WIDGET
  
  /* $.widget("js.changebackground", {
      _create: function() {

        function randomColor() {
          var letters = '0123456789ABCDEF';
          var color = '#';
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }

        this.element
          .css('background', randomColor());
      }
  }); */


  /* $.widget("js.changebackground", {
    
    options: {

    },
    
    
    _create: function() {
        
        this.element.css('background', randomColor());
    },

    randomColor: function() {
      
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      
    }
}); */
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

  /* $('.board').changebackground(); */

  /* $.widget("js.changebackground", {

  }).  */
});
