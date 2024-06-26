// Copyright (c) 2024, Alon Ben Refael and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Shopping List", {
// 	refresh(frm) {

// 	},
// });
var product;
var quant;
var unit;
var lst;
var dest;

frappe.ui.form.on('Shopping List', {
	refresh: function(frm) {
        frm.fields_dict.list_chld.grid.wrapper.on('click', '.grid-row-check', function(event) {
	    var tar = event.target;
	    if (tar.checked == true){
	         tar.checked = false;
                 lst = 'list_chld';
                 dest = 'taken_chld';
                 DoIt(tar,frm);
	    }
        });
        frm.fields_dict.taken_chld.grid.wrapper.on('click', '.grid-row-check', function(event) {
            var tar = event.target;
	    if (tar.checked == true){
	         tar.checked = false;
                 dest = 'list_chld';
                 lst = 'taken_chld';
                 DoIt(tar,frm);
	    }
        });
	}
});


function DoIt(elem,frm){
        var row = elem.parentNode.parentNode.parentNode;
        var idx = row.getAttribute('data-name');
        var row_num = Number(row.getAttribute('data-idx'))-1;
        document.querySelectorAll('[data-doctype="Product"]').forEach((prod) => {
            if (prod.parentNode.parentNode.parentNode.parentNode.getAttribute('data-name') == idx){
                product = prod.getAttribute('data-value');
            }
        });
        document.querySelectorAll('[data-fieldname="quant"]').forEach((q) => {
            if (q.parentNode.parentNode.getAttribute('data-name') == idx){
                quant = q.lastChild.textContent;//('data-value');
            }
        });
        document.querySelectorAll('[data-fieldname="unit"]').forEach((u) => {
            if (u.parentNode.parentNode.getAttribute('data-name') == idx){
                unit = u.lastChild.textContent;//('data-value');
            }
        });
        if (((lst == 'list_child') && (frm.doc.list_chld.length == 1)) || ((lst == 'taken_child') && (frm.doc.taken_chld.length == 1))){
            frm.set_value(lst,[]);
        }
        else{
    	    frm.get_field(lst).grid.grid_rows[row_num].remove();
        }
	var child = frm.add_child(dest);
	child.product = product;
	child.quant = quant;
	child.unit = unit;
	product = '';
        frm.save();
        chngeColor("grid-row");
}


frappe.ui.form.on('Shopping List', {
	onload(frm) {
        chngeColor("input-with-feedback");
	chngeColor("btn");
	chngeColor("grid-row");
	chngeColor("grid-heading-row");
        chngeColor("form-page");
        chngeColor("grid-footer");
        chngeColor("container");
	}
});

function chngeColor(elem){
	var client = new XMLHttpRequest();
	client.open('GET', '/files/'+elem);
	client.onreadystatechange = function() {
		if (client.status === 0 || (client.status == 200)){
			console.log (client.status);
			$("."+elem).each(function(i,onj){
				$(this).css('background-color', client.responseText);
			});
		}
	};
	client.send();
}

