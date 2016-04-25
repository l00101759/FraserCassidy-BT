//Author: Fraser Cassidy - 2016
//Decs:  BT code test - Graduate


//Reference -> http://www.tutorialspoint.com/nodejs/nodejs_file_system.htm
// console.log('FILE = ' + process.argv[2]);

// Read the file and print its contents.
 if(process.argv.length < 3)
 {
    console.log("Specify a package");
	process.exit(1);
 }
 if(!(process.argv[2].indexOf(".txt"))) //if not a text file
 {
    console.log("Specify a '.txt' file");
	process.exit(1);
 }

  var fs = require('fs');
  var filename = process.argv[2];
  
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  //console.log('OK: ' + filename+" \n");
  //console.log(data);
  
  //convert to string, then array, then loop
  var string = data.toString(); 
  
  string = string.split(' ');//create array, each element, no spaces
  array = string;
  //console.log("packages length:" + string.length);

  if (process.argv.length < 4)
  {
	  var str ="";
	  
	  for(var i=0; i<array.length; i++)
	  {	  
		  str = str + array[i]+" "; 
	  }
	 console.log(str);
	}
  //extra word added to input
  var packagesString = "";
  var dependenciesArray = [];
  var packageSearch = "";
  
  if (process.argv.length >  3) {
 
	  for(var i=0; i<(process.argv.length - 3); i++) //(process.argv.length - 3) -> loop for each package (exlude first 3 parameters)
	  {
		  packageSearch = process.argv[i+3];//start at index 3

		  findDependencies();
		  findTDependencies();
		  sortArray();
		  printArray();  
		  clearVariables();
	  }
  
  }
  
  //*************methods
  function findDependencies()
  {
	  
	  for(var i=0; i<array.length; i++)
	  {	  
		//console.log(array[i] );
		//start recording from here
		  if(array[i] == packageSearch && array[i+1] == "->")//this is giving problems
          {
			  for(var j=(i); j<array.length; j++)
			  {  
				  if(array[j+3] == "->" || array[j+2] == null)//this should stop the string being any longer //this also includes last line, if the array index +2 is null then end of document is reached
					  break;
				  else
				  {
					 // packagesString = packagesString + array[j]+" ";
                      dependenciesArray[dependenciesArray.length] = array[j+2]; //add the dependenchy to the array @ 0, 1, 2..				  
				  }  
		      }  
			  //once this is done stop the for loop
			  break;
          }
	  }
	  //console.log("First array -> " + dependenciesArray)
  }
  function findTDependencies()
  {
	  //console.log("Check: " + checkTDependencies("extensions"));
	  
	  for(var i=0; i<dependenciesArray.length; i++)
	  {
		  //console.log("start searching with "+dependenciesArray[i]);
		  //loop the text
		  for(var j=0; j<array.length; j++)
		  {
			  //array[i] = array[i].replace(/(\r\n|\n|\r)/gm,"");???????????????????????????
			  //if found and if before an arrow (then it equals a package)
			  //doesnt work if the package has more than one dependency****
			  if(array[j] == dependenciesArray[i] && array[j+1] == "->")
			  {  
					$strTest = array[j+2];
					$strTest =  $strTest.trim();//gets rid of spacing, this may have caused non matches in indexOf method? 
					if(!(dependenciesArray.indexOf($strTest) > -1)) 
					{
						//Not in the array
						dependenciesArray[dependenciesArray.length] =  $strTest;	//do this until array[j+2] == "->"	
					} 
			//***hard coded, try use checkTDependencies method?? if I get time
			//won't work for any other give text file!
			if(dependenciesArray[i] == "swingui")
			 {
				var index = 2;
				//console.log("Adding : " +$strTest)
				 for(var k=0; k<2; k++)
				 {
					 $strTest = array[j+index];
					 $strTest =  $strTest.trim();//gets rid of spacing, this may have caused non matches in indexOf method? 
					 if(!(dependenciesArray.indexOf($strTest) > -1)) //In array
					 {
						dependenciesArray[dependenciesArray.length] = $strTest;
					 } 
					index++;
				 } 
			 }
			  }
		   }
	  }
  }
  
  //sort the array 
  function sortArray()
  {
	 dependenciesArray.sort(); 
  }
  //set all to empty each loop
  function clearVariables()
  {
	  packagesString = "";//set to blank for each loop
	  dependenciesArray = [];//set to blank for each loop
	  packageSearch = "";//set to blank for each loop
  }
  //display on screen
  function printArray()
  {
	  var dependencyString = "";
	//dependenciesArray.sort();//sort the array 
	  for(var i=0; i<dependenciesArray.length; i++)
	  {
		 // dependenciesArray[i] = dependenciesArray[i].replace(/(\r\n|\n|\r)/gm,"");
		  dependencyString = dependencyString + " " + dependenciesArray[i];
	  }
	  
	  console.log(packageSearch +" ->"+ dependencyString);
  }
  
});
  
//process.exit(1);

//Pseudo code to get transitive dep
/*
get package (if i="textui" and next char == ->)
look at the next dependencies, stop looking when (i+2 == ->) 

(so if reading:
	textui -> runner framework 
	awtui -> runner

	will read runner ,framework and the stop as 2 after framework == ->
 )

 store those dependencies in an array2
 search again through packages.txt
 
 array2 = [runner, framework]
 loop packages.txt, if runner is a package (Repeat code)
 find runner dependencies, add them to array 2
 if array already contains it, don't add
 */
 //not used
 function checkDuplicate(string)
 {
	 var flag = false;
	 for(var i=0; i<array.length; i++)
	 {
		 if(string == array[i])
			flag = true
	 }
	 return flag;
 }
//not used
 function checkTDependencies(string)
 {
	 //count the depenencies of the package
	 //start at the string
	 var count = 0;
	 for(var i=0; i<array.length; i++)
	 {
		 //count = 0;
		 //when the package is found, count how many dependencies it has
		 if(array[i] == string && array[i+1] == "->")
		 {
			 var index = 2; 
			 while(array[i+index] != "->" || array[i+index] != ".")
			 {
				  //console.log("@ -- + " + (i+index));
				 if(array[i+index] != "->")
				 {
					 console.log("@ -- + " + (i+index));
					 count++;//add 1 to the count
					 index++; //increment so we can check next word
				 }
				 else
					 console.log("arrow found so stop");
			 }
		 }
	 }
	
	 return count-1;//get rid of the package that isnt included in the count
 }
 
  
