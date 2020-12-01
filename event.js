/*jshint esversion: 6 */

var Event = pc.createScript('event');

// initialize code called once per entity
Event.prototype.initialize = function () {
    var canvas = this.app.graphicsDevice.canvas;
    this.canvasWidth = parseInt(canvas.clientWidth, 10);
    this.canvasHeight = parseInt(canvas.clientHeight, 10);
    // Create a frame buffer picker with a resolution of canvasWidth*canvasHeight
    this.picker = new pc.Picker(this.app, this.canvasWidth, this.canvasHeight);
    
    
    let eventNameList = ['EVENT_MOUSEDOWN','EVENT_MOUSEMOVE','EVENT_MOUSEMOVE','EVENT_MOUSEWHEEL','EVENT_TOUCHSTART','EVENT_TOUCHMOVE','EVENT_TOUCHEND','EVENT_TOUCHCANCEL'];
    
    eventNameList.map(item =>{
        if(item.indexOf('MOUSE')>-1){
            this.app.mouse.on(pc[item], this.pickInstance, this);
        }else if(item.indexOf('TOUCH')>-1){
            if (this.app.touch) {
                this.app.touch.on(pc[item], this.pickInstance, this);
            }
        }
    });
};

// update code called every frame
Event.prototype.update = function (dt) {

};


Event.prototype.pickInstance = function (event) {
    var camera = this.entity.camera;
    var scene = this.app.scene;
    var picker = this.picker;

    picker.prepare(camera, scene);

    // Map the mouse coordinates into picker coordinates and
    // query the selection
    var selected = picker.getSelection(event.x, event.y);

    if (selected.length > 0) {
        // Get the graph node used by the selected mesh instance
        var entity = selected[0].node;

        // Bubble up the hierarchy until we find an actual Entity
        while (!(entity instanceof pc.Entity) && entity !== null) {
            entity = entity.getParent();
        }
        if (entity) {
            entity.fire('event:' + event.event.type, event);
        }
    }
};
