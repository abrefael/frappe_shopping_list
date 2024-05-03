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
var flag = true;

frappe.ui.form.on('shp', {
	refresh: function(frm) {
        frm.fields_dict.list_chld.grid.wrapper.on('click', '.grid-row-check', function(event) {
	    if (flag){
		flag=false;
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
                if (lst == 'list_chld'){
                    dest = 'taken_chld';
                    console.log(dest);
                }
                document.querySelectorAll('[data-doctype="Product"]').forEach((prod) => {
                    if (prod.parentNode.parentNode.parentNode.parentNode.getAttribute('data-name') == idx){
	                    var child = frm.add_child(dest);
			    child.product = prod.getAttribute('data-value');
                    }
                });
                document.querySelectorAll('[data-fieldname="quant"]').forEach((q) => {
                    if (q.parentNode.parentNode.getAttribute('data-name') == idx){
                            child.quant = q.lastChild.textContent;//('data-value');
                    }
                });
                document.querySelectorAll('[data-fieldname="unit"]').forEach((u) => {
                    if (u.parentNode.parentNode.getAttribute('data-name') == idx){
                            child.unit = u.lastChild.textContent;
                    }
                });
		frm.refresh_field(dest);
    		if (src_lst.length == 1){
    			frm.set_value(lst, []);
    		}
    		else{
    		    frm.get_field(lst).grid.grid_rows[row_num].remove();
    		}
    		if frm.is_dirty(){
			frm.save();
			flag=true;
		}
            }
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
