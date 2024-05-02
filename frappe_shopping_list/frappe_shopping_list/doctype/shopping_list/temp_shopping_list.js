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
    
frappe.ui.form.on('shp', {
	refresh: function(frm) {
        frm.fields_dict.list_chld.grid.wrapper.on('click', '.grid-row-check', function(event) {
            if (event.target.checked == true){
                var row = event.target.parentNode.parentNode.parentNode;
                var lst = row.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-fieldname');
                var idx = row.getAttribute('data-name');
                var row_num = Number(row.getAttribute('data-idx'))-1;
                var product;
                var quant;
                var unit;
                var dest;
                var src_lst = frm.doc.list_chld;
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
                if (lst == 'list_chld'){
                    dest = 'taken_chld';
                    console.log(dest);
                }
                else {
                    src_lst = frm.doc.taken_chld;
                    dest = 'list_chld';
                }
                var child = frm.add_child(dest);
    			child.product = product;
    			child.quant = quant;
    			child.unit = unit;
    			frm.refresh_field(dest);
    			if (src_lst.length == 1){
    				frm.set_value(lst, []);
    			}
    			else{
    			    frm.get_field(lst).grid.grid_rows[row_num].remove();
    			}
    			frm.save();
            }
        });
    }
});


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
