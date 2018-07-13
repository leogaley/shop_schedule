const React = require('react');

// Roll-over messages for icons
const checkMessage = "ALL Custom Materials Here";
const dateMessage = "HARD DATE";
const photoMessage = "Needs Photo(s)";

// Determine if due date is before today
function dateCalc(d) {

    const dateArray = d.split("/");
    let fixedDateArray = [];

    dateArray.forEach(element => {
        if (element.length < 2){
            fixedDateArray.push("0" + element);
        } else {
            fixedDateArray.push(element);
        }
    });

    const dateString = fixedDateArray.join("/");
    const updated = new Date(dateString);
    const dateDiff = Date.now()-updated;

    return dateDiff;
    
}

// Calculated renders for note, icon, and date fields
const fieldRenders = {

	note: function(props) {
        if (props.value === "" | props.value === undefined | props.value === null){
            return props.value;
        } else {
		return (
			<span title={props.value}>
				<span className="fa fa-sticky-note"></span>
			</span>
        );
        }
    },
    drawing: function(props) {
        if (props.value === "" | props.value === undefined | props.value === null){
            console.log('drawing link: ' + props.value);
            return props.value;
        } else {
            console.log('drawing link: ' + props.value);
		return (
			<span title={props.value}>
				<a href={props.value} target="_blank"><span className="fa fa-search-plus"></span></a>
			</span>
        );
        }
	},
	icon: function(props) {
		switch (props.value){
            case 'a':
                return (
                    <span title={checkMessage}>
                        <span className="fa fa-check"></span>
                    </span>
                );
            case 'b':
                return (
                    <span title={dateMessage}>
                        <span className="fa fa-calendar"></span>
                    </span>
                ); 
            case 'c':
                return (
                    <span title={photoMessage}>
                        <span className="fa fa-camera"></span>
                    </span>
                );
            case 'ac':
                return (
                    <span>
                        <span title={checkMessage}>
                            <span className="fa fa-check"></span>
                        </span>
                        <span title={photoMessage}>
                            <span className="fa fa-camera"></span>
                        </span>
                    </span>
                );
            case 'bc':
                return (
                    <span>
                        <span title={dateMessage}>
                            <span className="fa fa-calendar"></span>
                        </span>
                        <span title={photoMessage}>
                            <span className="fa fa-camera"></span>
                        </span>
                    </span>
                );
            case 'ab':
                return (
                    <span>
                        <span title={checkMessage}>
                            <span className="fa fa-check"></span>
                        </span>
                        <span title={dateMessage}>
                            <span className="fa fa-calendar"></span>
                        </span>
                    </span>
                );
            case 'abc':
                return (
                    <span>
                        <span title={checkMessage}>
                            <span className="fa fa-check"></span>
                        </span>
                        <span title={dateMessage}>
                            <span className="fa fa-calendar"></span>
                        </span>
                        <span title={photoMessage}>
                            <span className="fa fa-camera"></span>
                        </span>
                    </span>
                );   
            default:
                return "";            
        }
    },
    date: function(props) {

        const dateDiff = dateCalc(props.value);

        if (dateDiff > 0) {
            return (
                <span className="late" title={"Late Job"}>
                {props.value}<span className="fa fa-exclamation-triangle"></span>
                </span>
            );
        }
        else {
            return props.value;
        }

	}
}


module.exports.note = fieldRenders.note;
module.exports.icon = fieldRenders.icon;
module.exports.date = fieldRenders.date;
module.exports.drawing = fieldRenders.drawing;