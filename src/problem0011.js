/*
  In the 20×20 grid below, four numbers along a diagonal line have been marked in red.

    08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08
    49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00
    81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65
    52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91
    22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80
    24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50
    32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70
    67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21
    24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72
    21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95
    78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92
    16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57
    86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58
    19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40
    04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66
    88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69
    04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36
    20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16
    20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54
    01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48

  The product of these numbers is 26 × 63 × 78 × 14 = 1788696.

  What is the greatest product of four adjacent numbers in the same direction (up, down, left, right, or diagonally) in the 20×20 grid?
 */
(function() {

  // too lazy to add comas and braces
  var gridStr = [
  '08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08',
  '49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00',
  '81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65',
  '52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91',
  '22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80',
  '24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50',
  '32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70',
  '67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21',
  '24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72',
  '21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95',
  '78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92',
  '16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57',
  '86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58',
  '19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40',
  '04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66',
  '88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69',
  '04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36',
  '20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16',
  '20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54',
  '01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48',  
  ];

  // convert the array of strings into a matrix of numbers
  var grid = gridStr.map(function(row) {    
    return row.split(" ").map(function(numStr) {
      //make sure the ones that start with 0 aren't parsed as octal
      return parseInt(numStr, 10);
    });
  });

  function getHorizontalMaxProduct(matrix, adjacentNum) {
    var rowsNum = matrix.length;    
    var largest = 0;
    var largestInRow = 0;

    for(var rowIndex = 0; rowIndex < rowsNum; rowIndex++) {

      largestInRow = largestAdjacentInArray(matrix[rowIndex],  adjacentNum);
      if(largestInRow > largest) {
        largest = largestInRow;
      }

    }
    return largest;
  }

  function getVerticalMaxProduct(matrix, adjacentNum) {
    var transposed = transposeMatrix(matrix);
    return getHorizontalMaxProduct(transposed, adjacentNum);
  }


  function getLeftToRightDiagonalMaxProduct(matrix, adjacentNum) {
    var rowLength = matrix.length;
    var colLength = matrix[0].length;
    var diagonalRows = [];

    //will be used inside loops
    var i,j, currentRow, temp, limit;
    //iterate the first row and start adding from left to right up to down
    var length = colLength - adjacentNum;
    for(i = 0; i <= length; i++) {
      currentRow = [];
      temp = i;      
      //cache and prevent condition being shortened by incrementing i
      limit = colLength - i;
      for(j = 0; j < limit; j++) {
        currentRow.push(matrix[j][i]);
        i++;
      }
      i = temp;
      diagonalRows.push(currentRow);
    }

    //reuse length, if it's 20x20 it should be the same as previous length    
    length = rowLength - adjacentNum; 
    //now the remaining up to bottom, starting from 1 since we already did 0    
    for(i = 1; i <= length; i++) {
      currentRow = [];

      temp = i;
      limit = rowLength - i;
      for(j = 0; j < limit; j++) {
        currentRow.push(matrix[i][j]);
        i++;
      }
      i = temp;
      diagonalRows.push(currentRow);
    }

    var largest = 0;
    var largestInRow = 0;
    for(i = 0; i < diagonalRows.length; i++) {
      largestInRow = largestAdjacentInArray(diagonalRows[i], adjacentNum);
      if(largestInRow > largest) {
        largest = largestInRow;
      }
    }

    return largest;

  }

  function getRightToLeftDiagonalMaxProduct(matrix, adjacentNum) {
    var rowLength = matrix.length;
    var colLength = matrix[0].length;
    var diagonalRows = [];

    //will be used inside loops
    var i,j, currentRow, temp, limit;
    //iterate starting from top to bottom
    var length = colLength - adjacentNum;
    for(i = adjacentNum -1; i < colLength; i++) {
      currentRow = [];
      temp = i;
      //cache and prevent condition being shortened by incrementing i
      limit = temp + 1;
      for(j = 0; j <= temp; j++) {
        currentRow.push(matrix[j][i]);
        i--;
      }      
      i = temp;
      diagonalRows.push(currentRow);
    }

    //reuse length, if it's 20x20 it should be the same as previous length    
    length = rowLength - adjacentNum; 
    //now the remaining up to bottom, starting from 1 since we already did 0    
    for(i = 1; i <= length; i++) {
      currentRow = [];

      temp = i;
      limit = colLength - i;
      //right to left up to bottom
      for(j = rowLength -1; j >= temp; j--) {
        currentRow.push(matrix[i][j]);
        i++;
      }
      i = temp;
      diagonalRows.push(currentRow);
    }

    var largest = 0;
    var largestInRow = 0;
    for(i = 0; i < diagonalRows.length; i++) {
      largestInRow = largestAdjacentInArray(diagonalRows[i], adjacentNum);
      if(largestInRow > largest) {
        largest = largestInRow;
      }
    }

    return largest;    
  }

  function transposeMatrix(original) {
    //clone without copying reference
    var transposed = JSON.parse(JSON.stringify(original));
    var rowLength = original.length;
    var colLength = original[0].length;
    for(var rowIndex = 0; rowIndex < rowLength; rowIndex++ ) {
      for(var colIndex = 0; colIndex < colLength; colIndex++ ) {
        transposed[colIndex][rowIndex] = original[rowIndex][colIndex];
      }
    }
    return transposed;
  }

  function largestAdjacentInArray(arr, adjacentNum) {
    var length = arr.length - adjacentNum;
    var largest = 0;

    for(var i = 0; i < length; i++) {
      var product = 1;
      var limit = i + adjacentNum;
      for(var j = i; j < limit; j++) {
        //if we find a 0, let's advance i to the next number to avoid unneccessary iterations
        var value = arr[j];
        if(value === 0) {
          i = j +1;
          product = 0;
          break;
        }
        product *= value;

      }

      if(product > largest) {
        largest = product;
      }
    }
    return largest;
  }

  var largestHorizontal = getHorizontalMaxProduct(grid, 4);
  var largestVertical = getVerticalMaxProduct(grid, 4);
  var largestDiagonal = getLeftToRightDiagonalMaxProduct(grid, 4);
  var largestDiagonal2 = getRightToLeftDiagonalMaxProduct(grid, 4);
  console.log("Largest horizontal: " + largestHorizontal);
  console.log("Largest vertical: " + largestVertical);
  console.log("Largest diagonal (left to right): " + largestDiagonal);
  console.log("Largest diagonal (right to left): " + largestDiagonal2);

  var largestOfAll = Math.max.apply(Math, [largestHorizontal, largestVertical, largestDiagonal, largestDiagonal2]);
  console.log("Largest of all: " + largestOfAll);

})();