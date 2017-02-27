Ext.onReady(function(){

	var accordion = new Ext.Panel({
		id: 'accordion',
		contentEl: 'center',
		title: 'RMA Report / RMA Management Report Maintain',
		autoScroll: true,
		margins:'0 0 0 0'
	});
		
	new Ext.Viewport({
		layout: 'fit',
		items: [accordion]
	});
	
	new Ext.Panel({
		id: 'querycol_panel',
		contentEl: 'querycol_con',
		hideCollapseTool: false,
		titleCollapse: true,
		collapsible: true,
		collapsed: false,
		renderTo: 'querycol',
		padding: 3
	});
	
	new Ext.Panel({
		id: 'querycol_panel_1',
		contentEl: 'querycol_con1',
		hideCollapseTool: true,
		titleCollapse: true,
		collapsible: true,
		collapsed: true,
		renderTo: 'querycol_1',
		padding: 3
	});

	new Ext.Panel({
		id: 'querycol_panel_2',
		contentEl: 'querycol_con2',
		hideCollapseTool: true,
		titleCollapse: true,
		collapsible: true,
		collapsed: true,
		renderTo: 'querycol_2',
		padding: 3
	});
	
	new Ext.Panel({
		id: 'querycol_panel_3',
		contentEl: 'querycol_con3',
		hideCollapseTool: true,
		titleCollapse: true,
		collapsible: true,
		collapsed: true,
		renderTo: 'querycol_3',
		padding: 3
	});
	
	onConfirm(2);
	
	radClick('rad-3');
	radClick('rad-6');
});

function clickEvent(type){
	clearMsg();
	Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn){
		if(btn == 'yes'){
			type++;
			onConfirm(type);
		}
	});
}

function onConfirm(type){
	
	Ext.getCmp('querycol_panel_1').collapse();
	Ext.getCmp('querycol_panel_2').collapse();
	Ext.getCmp('querycol_panel_3').collapse();
	
	Ext.getCmp('querycol_panel_' + type).expand();	
	
	Ext.getDom('currentStage').value = type;
	
	Ext.getDom('note').innerHTML='<font color="red">Current is "Stage '+type+'". </font>';
	if (type != 3){
		Ext.getDom('note').innerHTML+='<br />Press "Next" button will come to next stage. It will not be able to recall.';
	}else{
		Ext.getDom('btn_1').disabled = "disabled";
		Ext.getDom('btn_1').style.display = "none";
	}
}

// Compobox

function radClick(type){
	Ext.getDom('container-'+type).style.display='';
	drawComboBox(type);
}

function drawComboBox(type){
	
	var store1= new Ext.data.ArrayStore({
		fields: ['id', 'value'],
		data: [
			['201612', '201612'],
			['201701', '201701'],
			['201702', '201702']
		]
	});
	
	var store2 = new Ext.data.ArrayStore({
		fields: ['abbr', 'state', 'nick'],
		data : Ext.exampledata.states // from states.js
	});
	
	if ( typeof Ext.getCmp('combobox-'+type+'-startDt') == 'undefined'){
	
		var combo = new Ext.form.ComboBox({
			id: 'combobox-'+type+'-startDt',
			store: store1,
			displayField:'value',
			typeAhead: true,
			mode: 'local',
			forceSelection: true,
			triggerAction: 'all',
			emptyText:'Start Month',
			selectOnFocus:true,
			renderTo: 'cbb_'+type+'_startDt',
			width: 100
		});
	}
	
	if ( typeof Ext.getCmp('combobox-'+type+'-endDt') == 'undefined'){
	
		var combo = new Ext.form.ComboBox({
			id: 'combobox-'+type+'-endDt',
			store: store1,
			displayField:'value',
			typeAhead: true,
			mode: 'local',
			forceSelection: true,
			triggerAction: 'all',
			emptyText:'End Month',
			selectOnFocus:true,
			renderTo: 'cbb_'+type+'_endDt',
			width: 100
		});
	}
	
	if ( typeof Ext.getCmp('combobox-'+type+'-states') == 'undefined'){
		
		var radItems = [];
		for(i=0; i<10; i++){
			var lab = store2.data.items[i].json[1];
			var name = type + '-cb-col-' + i;
			radItems.push(
				{
					boxLabel: lab,
					name: name
				}
			);
		}
		
		var myCheckboxGroup = new Ext.form.CheckboxGroup({
			id:'combobox-'+type+'-states',
			xtype: 'checkboxgroup',
			fieldLabel: '',
			itemCls: 'x-check-group-alt',
			columns: 1,
			height: 150,
			autoScroll: true,
			items: [
				radItems
			]
		});
		
		myCheckboxGroup.render('cbb_'+type+'_states');
	}
}

function showMsg(color, msg){
	var html = "<font color=\""+color+"\" size=\"2\">"+msg+"</font>";
	Ext.getDom('processStatusMessage').innerHTML=html;
}

function clearMsg(){
	Ext.getDom('processStatusMessage').innerHTML='';
}

function uploadClick(type){
	clearMsg();
	Ext.getDom('rad-'+type).checked = true;
	showMsg('green', 'Upload Report (' + type + ') Success!' );
}

function exportClick(type){
	clearMsg();
	
	showMsg('green', 'Export Report (' + type + ') Success!' );
}