var EventsPackage = pc.createScript('eventsPackage')

// initialize code called once per entity
EventsPackage.prototype.initialize = function() {
  var canvas = this.app.graphicsDevice.canvas
  this.canvasWidth = parseInt(canvas.clientWidth, 10)
  this.canvasHeight = parseInt(canvas.clientHeight, 10)
  // Create a frame buffer picker with a resolution of canvasWidth*canvasHeight
  this.picker = new pc.Picker(this.app, this.canvasWidth, this.canvasHeight)

  // Disabling the context menu stops the browser displaying a menu when
  // you right-click the page
  this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this)
  this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this)
  this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this)
  this.app.mouse.on(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this)

  this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this)
  this.app.keyboard.on(pc.EVENT_KEYUP, this.onKeyUp, this)

  if (this.app.touch) {
    this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this)
    this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this)
    this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this)
    this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchCancel, this)
  }
}

// update code called every frame
EventsPackage.prototype.update = function(dt) {}

EventsPackage.prototype.pickInstance = function(event) {
  var camera = this.entity.camera
  var scene = this.app.scene
  var picker = this.picker

  picker.prepare(camera, scene)

  // Map the mouse coordinates into picker coordinates and
  // query the selection
  var selected = picker.getSelection(event.x, event.y)

  if (selected.length > 0) {
    // Get the graph node used by the selected mesh instance
    var entity = selected[0].node

    // Bubble up the hierarchy until we find an actual Entity
    while (!(entity instanceof pc.Entity) && entity !== null) {
      entity = entity.getParent()
    }
    if (entity) {
      entity.fire('event:' + event.event.type, event)
      console.log(
        'fire event "event:' +
          event.event.type +
          '" to ' +
          entity.name +
          ' Entity'
      )
    }
  }
}

//mouse

EventsPackage.prototype.onMouseMove = function(event) {
  this.pickInstance(event)
}

EventsPackage.prototype.onMouseDown = function(event) {
  this.pickInstance(event)
}

EventsPackage.prototype.onMouseUp = function(event) {
  this.pickInstance(event)
}

EventsPackage.prototype.onMouseWheel = function(event) {
  this.pickInstance(event)
}

//keyboard

EventsPackage.prototype.onKeyDown = function(event) {
  this.pickInstance(event)
}

EventsPackage.prototype.onKeyUP = function(event) {
  this.pickInstance(event)
}

EventsPackage.prototype.onTouchStart = function(event) {
  this.pickInstance(event)
}

EventsPackage.prototype.onTouchEnd = function(event) {
  this.pickInstance(event)
}

EventsPackage.prototype.onTouchMove = function(event) {
  this.pickInstance(event)
}

EventsPackage.prototype.onTouchCancel = function(event) {
  this.pickInstance(event)
}
