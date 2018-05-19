const React = require('react');

const checkMessage = "ALL Custom Materials Here";
const dateMessage = "HARD DATE";
const photoMessage = "Needs Photo(s)";

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

    var dateDiff = Date.now()-updated;

    return dateDiff;
    
}

module.exports = {
	wo: function(props) {
        const dateDiff = dateCalc(props.record.duedate);

        if (dateDiff > 0) {
            return (
                <span className="late" title={"Open Work Order -> LATE!"}>
                <a href="#">{props.value}</a>
                </span>
            );
        }
        else {
            return (
                <span title={"Open Work Order"}>
                    <a href="#">{props.value}</a>
                </span>
            );
        }
		
	},
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
        }
    },
    date: function(props) {
        // const dateArray = props.value.split("/");
        // let fixedDateArray = [];
        // dateArray.forEach(element => {
        //     if (element.length < 2){
        //         fixedDateArray.push("0" + element);
        //     } else {
        //         fixedDateArray.push(element);
        //     }
        // });

        // const dateString = fixedDateArray.join("/");

        // const updated = new Date(dateString);

        // var dateDiff = Date.now()-updated;
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