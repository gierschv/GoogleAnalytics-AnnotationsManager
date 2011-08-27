Google Analytics Annotations Manager
====================================

Why ?
-----
You want to copy your annotations between Google Analytics accounts / profiles ?
You want to remove multiples annotations together ?
You want to export your annotations as a CSV file ?

This Greasemonkey user script is for you : it provides GA annotations manage tools for your Google Analaytics interface.

How use it ?
------------
Install this userscript using Greasemonkey in Firefox (not tested yet
in Chrom{e,ium}, but don't support @require support) and use the version 5 of Google Analytics.

You will show new annotations features in Google Analytics annotations panel as shown on the screenshot.

How it works ?
--------------
This user script uses HTML5 localstorage to store the annotations into your browser.

Screenshots
-----------
![Sreenshot](https://lh5.googleusercontent.com/--qEEkeRfe0k/TljN9Egc1yI/AAAAAAAAAGk/a1drHp2QyvM/GA-Annotations-v0.2.PNG)

Changelog
---------
-   v0.2 :
    -    Clean jQuery requirement ;
    -    Use fireEvent with @FGRibreau jQuery library instead of
         jQuery trigger and Google Analytics Actionscript methods ;
    -    Display checkboxes on panel display ;
    -    Implement remove of annotations using added checkboxes ;
    -    Implement basic CSV export using added checkboxes.
-   v0.1
    -    Implement copy of annotations.
