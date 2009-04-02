(function($){
var Smiley = function (r) {
    var options = {
        colors: ["#edc240", "#afd8f8", "#afd8f8", "#edc240", "#edc240"],
        grid: {
            borderWidth: 0,
        },
        xaxis: {
            min: -0.5,
            max: 0.5,
            ticks: 0,
        },
        yaxis: {
            min: -0.5,
            max: 0.5,
            ticks: 0,
        },
        points: { radius: 11, fill: true, fillColor: "#edc240", },
    };
    var topHalf = [];
    var topBegin = [];
    var topEnd = [];
    var bottomHalf = [];
    var bottomBegin = [];
    var bottomEnd = [];
    for (var x = 0; x > - Math.sqrt(2)/4; x -= 0.05) {
        var y = Math.sqrt(0.25 - x*x);
        topHalf.unshift([x, y]);
        topHalf.push([-x, y]);
        topBegin.push([-y, -x]);
        topEnd.unshift([y, -x]);
        bottomHalf.unshift([x, -y]);
        bottomHalf.push([-x, -y]);
        bottomBegin.push([-y, x]);
        bottomEnd.unshift([y, x]);
    }
    topHalf = topBegin.concat(topHalf, topEnd);
    bottomHalf = bottomBegin.concat(bottomHalf, bottomEnd);
    var eyes = [[-0.2, 0.15],[0.2, 0.15]];

    var mouth = [];
    if (Math.abs(r) < 0.0001) {
        mouth.push([-0.25, -0.25]);
        mouth.push([0.25, -0.25]);
    } else {
        var sign = 1;
        if (r < 0) {
            sign = -1;
            if (r < -3.7) {
                r = -3.7
            }
            r = -1. / r;
        } else if (r > 0) {
            if (r > 3.7) {
                r = 3.7
            }
            r = 1. / r;
        }
        var halfMouthLength = 0.25;
        var sinT = halfMouthLength / r;
        var cosT = Math.sqrt(1 - sinT * sinT);
        //this is the center to the flatline
        var dist2FlatMouthY = r - (r - r * cosT)/2; 
        var mouthCircleY = -0.25 + dist2FlatMouthY;
        for (var x = -0.25; x < 0.25; x += 0.05) {
            var y = mouthCircleY - Math.sqrt(r*r - x*x);
            if (sign == -1) {
                mouth.push([x, -0.5-y]);
            } else {
                mouth.push([x, y]);
            }
        }
        mouth.push([0.25, mouth[0][1]]);
    }

    $.plot($("#smileyholder"), [
        {
            data: eyes,
            points: { show: true, fill: true }
        },
        {
            data: topHalf,
            lines: { show: true, fill: true }
        },
        {
            data: bottomHalf,
            lines: { show: true, fill: true }
        },
        {
            data: mouth,
            lines: { show: true, fill: false }
        }
    ], options);
};

$.smiley = function(r) {
    Smiley(r);
    //var smiley = new Smiley(r);
    //return smiley;
};

var smileyRadius = 0;
$.getSmileyRadius = function() { return smileyRadius; };
$.animateSmiley = function animateSmiley(step, count) {
    if (count > 0) {
        count--;
        smileyRadius = smileyRadius + step;
        Smiley(smileyRadius);
        setTimeout(function() {animateSmiley(step, count)}, 100);
    }
};
})(jQuery);
