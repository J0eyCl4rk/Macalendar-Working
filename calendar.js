// code framework taken from /*https://code-boxx.com/simple-pure-javascript-calendar-events/*/ and modified to fit our project goals

import firebase from './firebase.js';

var cal = {
  // (A) PROPERTIES
  mName : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // Month Names
  data : {}, // Events for the selected period
  startData:{}, //Start time for event
  endData:{},
  sDay : 0, // Current selected day
  sMth : 0, // Current selected month
  sYear : 0, // Current selected year
  sMon : false, // Week start on Monday?
  fbaseHolder:[],
  items:[],
  // (B) DRAW CALENDAR FOR SELECTED MONTH
  list : function () {

    console.log('!!! hello world');

    // (B1) BASIC CALCULATIONS - DAYS IN MONTH, START + END DAY
    // Note - Jan is 0 & Dec is 11 in JS.
    // Note - Sun is 0 & Sat is 6
    cal.sMth = parseInt(document.getElementById("cal-mth").value); // selected month
    cal.sYear = parseInt(document.getElementById("cal-yr").value); // selected year
    var daysInMth = new Date(cal.sYear, cal.sMth+1, 0).getDate(), // number of days in selected month
        startDay = new Date(cal.sYear, cal.sMth, 1).getDay(), // first day of the month
        endDay = new Date(cal.sYear, cal.sMth, daysInMth).getDay(); // last day of the month

    // (B2) LOAD DATA FROM LOCALSTORAGE
    //Set the firebase dictionary to have values loaded from back end
    cal.setFbaseData();
    console.log("FIRE!!!!!",cal.fireBaseData);

    // (B3) DRAWING CALCULATIONS
    // Determine the number of blank squares before start of month
    var squares = [];
    if (cal.sMon && startDay != 1) {
      var blanks = startDay==0 ? 7 : startDay ;
      for (var i=1; i<blanks; i++) { squares.push("b"); }
    }
    if (!cal.sMon && startDay != 0) {
      for (var i=0; i<startDay; i++) { squares.push("b"); }
    }

    // Populate the days of the month
    for (var i=1; i<=daysInMth; i++) { squares.push(i); }

    // Determine the number of blank squares after end of month
    if (cal.sMon && endDay != 0) {
      var blanks = endDay==6 ? 1 : 7-endDay;
      for (var i=0; i<blanks; i++) { squares.push("b"); }
    }
    if (!cal.sMon && endDay != 6) {
      var blanks = endDay==0 ? 6 : 6-endDay;
      for (var i=0; i<blanks; i++) { squares.push("b"); }
    }

    // (B4) DRAW HTML CALENDAR
    // Container
    var container = document.getElementById("cal-container"),
        cTable = document.createElement("table");
    cTable.id = "calendar";
    container.innerHTML = "";
    container.appendChild(cTable);

    // First row - Day names
    var cRow = document.createElement("tr"),
        cCell = null,
        days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    if (cal.sMon) { days.push(days.shift()); }
    for (var d of days) {
      cCell = document.createElement("td");
      cCell.innerHTML = d;
      cRow.appendChild(cCell);
    }
    cRow.classList.add("head");
    cTable.appendChild(cRow);

    // Days in Month
    var total = squares.length;
    cRow = document.createElement("tr");
    cRow.classList.add("day");
    for (var i=0; i<total; i++) {
      cCell = document.createElement("td");
      if (squares[i]=="b") { cCell.classList.add("blank"); }
      else {
        cCell.innerHTML = "<div class='dd'>"+squares[i]+"</div>";
        if (cal.data[squares[i]]) {
          cCell.innerHTML += "<div class='evt'>" + cal.fireBaseData[squares[i]] + "</div>";
        }
        cCell.addEventListener("click", function(){
          cal.show(this);
          console.log(cal.fireBaseData[cal.sDay]);
          if (cal.fireBaseData[cal.sDay]!= undefined){
            Swal.fire(  'Oops, this date is already populated!',
            'Please select another day', 
            'error');
            cal.close();
            }
        });
      }
      cRow.appendChild(cCell);
      if (i!=0 && (i+1)%7==0) {
        cTable.appendChild(cRow);
        cRow = document.createElement("tr");
        cRow.classList.add("day");
      }
    }

    // (B5) REMOVE ANY PREVIOUS ADD/EDIT EVENT DOCKET
    cal.close();
  },

  // (C) SHOW EDIT EVENT DOCKET FOR SELECTED DAY
  show : function (el) {
    // (C1) FETCH EXISTING DATA
    cal.sDay = el.getElementsByClassName("dd")[0].innerHTML;

    // (C2) DRAW EVENT FORM - ADD EVENT FORM
    var tForm = "<h1>" + (cal.data[cal.sDay] ? "EDIT" : "ADD") + " EVENT</h1>";
    tForm += "<div id='evt-date'>" + cal.sDay + " " + cal.mName[cal.sMth] + " " + cal.sYear + "</div>";
    tForm += "<textarea id='evt-details' maxlength='50' required>" + "</textarea>";
    tForm += "<select id = 'start' name = 'start-time' onchange = 'setEndTimeDrop(this)' required='required'> <option value=''> ---Start time--- </option> <option> 12 am </option> <option> 1 am </option> <option> 2 am </option> <option> 3 am </option> <option> 4 am </option> <option> 5 am </option> <option> 5 am </option> <option> 6 am </option> <option> 7 am </option> <option> 8 am </option> <option> 9 am </option> <option> 10 am </option> <option> 11 am </option> <option> 12 pm </option>  <option> 1 pm </option> <option> 2 pm </option> <option> 3 pm </option> <option> 4 pm </option> <option> 5 pm </option> <option> 6 pm </option> <option> 7 pm </option> <option> 8 pm </option> <option> 9 pm </option> <option> 10 pm </option> <option> 11 pm </option> </select>";
    tForm += "<select id = 'finish' name = 'end-time' required='required'> <option value = ''> ---End time--- </option> <option> 12 am </option> <option> 1 am </option> <option> 2 am </option> <option> 3 am </option> <option> 4 am </option> <option> 5 am </option> <option> 5 am </option> <option> 6 am </option> <option> 7 am </option> <option> 8 am </option> <option> 9 am </option> <option> 10 am </option> <option> 11 am </option> <option> 12 pm </option>  <option> 1 pm </option> <option> 2 pm </option> <option> 3 pm </option> <option> 4 pm </option> <option> 5 pm </option> <option> 6 pm </option> <option> 7 pm </option> <option> 8 pm </option> <option> 9 pm </option> <option> 10 pm </option> <option> 11 pm </option> </select>";
    tForm += "<input type='button' value='Close' onClick = 'formClose()'/>";
    //tForm += "<input type='button' value='Delete' onclick='cal.del()'/>";
    tForm += "<input type='submit' value='Save'/>";

    // (C3) ATTACH EVENT FORM
    var eForm = document.createElement("form");
    eForm.addEventListener("submit", cal.save);
    eForm.innerHTML = tForm;
    var container = document.getElementById("cal-event");
    container.innerHTML = "";
    container.appendChild(eForm);
  },

  // (D) CLOSE EVENT DOCKET
  close : function () {
    document.getElementById("cal-event").innerHTML = "";
  },

  // (E) SAVE EVENT

  //write things here!!!!!!!!!!!!!!!!!!!!!!!
  save : function (evt) {
    evt.stopPropagation();
    evt.preventDefault();

    firebase.firestore().collection('events')
    var size = 0;
    firebase.firestore().collection("events").get().then(snap => {
      size = snap.size // will return the collection size
      console.log('!!!size',size)
    });
     
     // Get the unique ID generated by push() by accessing its key
     var postID = firebase.firestore().collection("events").key;
    console.log('!!!post id',postID);
    firebase.firestore().collection("events").doc(postID).set({
      evtDetails: document.getElementById("evt-details").value,
      start: document.getElementById("start").value,
      finish: document.getElementById("finish").value,
      day: cal.sDay,
      month: cal.sMth,
      year: cal.sYear
    });

    var docRef = firebase.firestore().collection("events").doc("event1");
    const item1 = [];
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("!!!Item data:", doc.data());
            item1.push(doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    cal.loadCalendar();
  },

  loadFBase : function(){
    firebase.firestore().collection("events").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //ASK YIXUAN
        //var dict = doc.data();
        //dict["id"]=(doc.id);
        //cal.items.push(dict);
    // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      cal.items.push(doc.data());
      console.log(cal.items);
  });
    console.log('!!!item1111111',cal.items);
});
    console.log('!!!loadBase!!!!!!!!!!!!!!!' );
  },

  loopFbaseList : function (){
    console.log("Looping items list");
    var returnDictionary = {};
    for(var i = 0; i<cal.items.length;i++){
      cal.sDay = cal.items[i]["day"];
      cal.sMth = cal.items[i]["month"];
      cal.sYear = cal.items[i]["year"];

      cal.startData[cal.sDay] = cal.items[i]["start"];
      cal.endData[cal.sDay] = cal.items[i]["finish"];
      cal.data[cal.sDay] = cal.items[i]["evtDetails"];

      var concat1 = cal.startData[cal.sDay] + " - "+cal.endData[cal.sDay]+" " + cal.data[cal.sDay];
      returnDictionary[cal.sDay] = concat1;
    };
    return returnDictionary;
  },

  setFbaseData : function (){
    cal.fireBaseData = cal.loopFbaseList();
  },

  // (F) DELETE EVENT FOR SELECTED DATE 
  //FIX
  del : function () {
    if (confirm("Remove event?")) {
      delete cal.data[cal.sDay];
      localStorage.setItem("cal-" + cal.sMth + "-" + cal.sYear, JSON.stringify(cal.data));
      cal.loadCalendar();;
    }
  },

  loadCalendar : function(){
    console.log("LOADCAL!!!")
    cal.loadFBase();
    setTimeout(() => {cal.list()},1000);
  }
};

// (G) INIT - DRAW MONTH & YEAR SELECTOR
window.addEventListener("load", function () {
  // (G1) DATE NOW
  var now = new Date(),
      nowMth = now.getMonth(),
      nowYear = parseInt(now.getFullYear());

  // (G2) APPEND MONTHS SELECTOR
  var month = document.getElementById("cal-mth");
  //for (var i = 0; i < 1; i++) {
    var i = nowMth;
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = cal.mName[i];
    if (i==nowMth) { opt.selected = true; }
    month.appendChild(opt);
  //}

  // (G3) APPEND YEARS SELECTOR
  // Set to 10 years range. Change this as you like.
  var year = document.getElementById("cal-yr");
  //for (var i = nowYear; i<=nowYear+1; i++) {
    var i = nowYear;
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = i;
    if (i==nowYear) { opt.selected = true; }
    year.appendChild(opt);
  //}

  // (G4) START - DRAW CALENDAR
  cal.loadCalendar();
});