var TAG_SPRITE = 1;

var HelloWorldLayer = cc.Layer.extend({
    sprite : null,

    ctor : function () {
        this._super();
        this.init();

        var listener = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    target.opacity = 180;
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                cc.log("sprite onTouchesEnded.. ");
                target.setOpacity(255);
                if (target == sprite2) {
                    containerForSprite1.setLocalZOrder(100);
                } else if (target == sprite1) {
                    containerForSprite1.setLocalZOrder(0);
                }
            }
        });

        var sprite = cc.Sprite.create(res.HelloWorld_png);
        var layer = cc.LayerColor.create(cc.color(0, 0, 0, 0));
        this.addChild(layer, -1);

        this.addChild(sprite, 0, TAG_SPRITE);
        cc.eventManager.addListener(listener, sprite);

        return true;
          
//      //////////////////////////////
//      // 1. super init first
//      this._super();

//      /////////////////////////////
//      // 2. add a menu item with "X" image, which is clicked to quit the program
//      //    you may modify it.
//      // ask director the window size
//      var size = cc.director.getWinSize();

//      // add a "close" icon to exit the progress. it's an autorelease object
//      var closeItem = cc.MenuItemImage.create(
//          res.CloseNormal_png,
//          res.CloseSelected_png,
//          function () {
//              cc.log("Menu is clicked!");
//          }, this);
//      closeItem.attr({
//          x: size.width - 20,
//          y: 20,
//          anchorX: 0.5,
//          anchorY: 0.5
//      });

//      var menu = cc.Menu.create(closeItem);
//      menu.x = 0;
//      menu.y = 0;
//      this.addChild(menu, 1);

//      /////////////////////////////
//      // 3. add your codes below...
//      // add a label shows "Hello World"
//      // create and initialize a label
//      var helloLabel = cc.LabelTTF.create("Hello World", "Arial", 38);
//      // position the label on the center of the screen
//      helloLabel.x = size.width / 2;
//      helloLabel.y = 0;
//      // add the label as a child to this layer
//      this.addChild(helloLabel, 5);

//      // add "HelloWorld" splash screen"
//      this.sprite = cc.Sprite.create(res.HelloWorld_png);
//      this.sprite.attr({
//          x: size.width / 2,
//          y: size.height / 2,
//          scale: 0.5,
//          rotation: 180
//      });
//      this.addChild(this.sprite, 0);

//      var rotateToA = cc.RotateTo.create(2, 0);
//      var scaleToA = cc.ScaleTo.create(2, 1, 1);

//      this.sprite.runAction(cc.Sequence.create(rotateToA, scaleToA));
//      helloLabel.runAction(cc.Spawn.create(cc.MoveBy.create(2.5, cc.p(0, size.height - 40)),cc.TintTo.create(2.5,255,125,0)));
//      return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

