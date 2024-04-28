// Copyright (c) 2024, Alon Ben Refael and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Shopping List", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on('Shopping List', {
	onload_post_render(frm) {
        function chngeColor(elem){
            var client = new XMLHttpRequest();
        	client.open('GET', '/files/'+elem);
        	client.onreadystatechange = function() {
        	    if (client.status === 0 || (client.status == 200)){
        	        console.log (client.status);
            	    $("."+elem).each(function(i,onj){
            	        $(this).css('background-color', client.responseText);
            	        frm.refresh();
        	        });
        	    }
        	};
            client.send();
        }
        chngeColor("input-with-feedback");
	    chngeColor("btn");
	    chngeColor("grid-row");
	    chngeColor("grid-heading-row");
        chngeColor("form-page");
        chngeColor("grid-footer");
        chngeColor("container");
	    if (!frm.is_new()){
	        setInterval(function () {
	            var tbl = frm.doc.take_tbl;
                var i = tbl.length;
                var child;
				var origin;
                if (i == 1) {
					origin = tbl[0];
                    if (origin.taken) {
                        child = frm.add_child("took_tbl");
                        child.product = origin.product;
						child.quant = origin.quant;
						child.unit = origin.unit;
                        frm.set_value('take_tbl', []);
                    }
                }
                else {
                    while (i--) {
						origin = tbl[i];
						if (origin.taken) {
							child = frm.add_child("took_tbl");
							child.product = origin.product;
							child.quant = origin.quant;
							child.unit = origin.unit;
						}
                    }
                }
                tbl = frm.doc.took_tbl;
                i = tbl.length;
                if (i == 1) {
					origin = tbl[0];
                    if (!tbl[0].taken) {
                        child = frm.add_child("take_tbl");
                        child.product = origin.product;
						child.quant = origin.quant;
						child.unit = origin.unit;
                        frm.set_value('took_tbl', []);
                    }
                }
                else {
                    while (i--) {
						origin = tbl[i];
                        if(!tbl[i].taken) {
                            child = frm.add_child("take_tbl");
                            child.product = origin.product;
							child.quant = origin.quant;
							child.unit = origin.unit;
                            frm.get_field("took_tbl").grid.grid_rows[i].remove();
                        }
                    }
                }
                frm.refresh();
		if (frm.is_dirty()){
			frm.save();
		}
	        }, 10000);
	    }
	}
});

frappe.ui.form.on('Shopping List', {
	before_save(frm) {
    var tbl = frm.doc.take_tbl;
    var n = tbl.length;
    var prod;
    var prods = [];
    var i;
    if (n > 1) {
      while (n--){
        prod = tbl[n].product;
        i = prods.indexOf(prod);
        if ((i >= 0) && (i < n)){
          frm.get_field("take_tbl").grid.grid_rows[n].remove();
        }
        else {
          prods.push(prod);
        }
      }
	  }
  }
});


frappe.ui.form.on('Shopping List', {
	refresh(frm) {
		// your code here
	}
});
