Google Analytics Annotations Copy
=================================

Why ?
-----
You want to copy your annotations between Google Analytics accounts/profiles ?
This Greasemonkey user script is for you : it provides GA annotations copy tools
for your Google Analaytics interface.

How ?
-----
In first, install this userscript using Greasemonkey in Firefox (not tested yet
in Chrom{e,ium}).

In second, go inside the profile you want copy the annotations, (for example
in the Visitors overview page), open the annotations panel, and click on
"Copy annotation(s)". By default, all of the annotations from the current period
will be copied into the localstorage. You can select or deselect copied
annotations using the checkboxes on the right of the panel.

In third, go inside the profile you want paste the annotations, open the
annotaions panel, and click on "Paste XX annotation(s)". You should see the
annotations copied.

How it works ?
--------------
This user script uses HTML5 localstorage to store the annotations into your
browser.

Screenshots
-----------
Select which annotations you want to copy :

![Select which annotations you want to copy](https://lh6.googleusercontent.com/-O7wWF_AcV78/TkVMyK8UKwI/AAAAAAAAACI/pHXJ-Tidyvg/Capture.PNG)

Paste stored annotations :

![Paste stored annotations](https://lh3.googleusercontent.com/-EYmepvil6EA/TkVMyIAJJXI/AAAAAAAAACM/uD-K_jNZEBY/Capture-1.PNG)
