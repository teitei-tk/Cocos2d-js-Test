var TAG_SPRITE = 1;

var HelloWorldLayer = cc.Layer.extend({
    sprite : null,

    moveSprite : function( position ) {
       var sprite = this.getchildbytag(tag_sprite);
        sprite.stopallactions();
        sprite.runaction(cc.moveto.create(1, position));
        var o = position.x - sprite.x;
        var a = position.y - sprite.y;
        var at = math.atan(o / a) * 57.29577951;  // radians to degrees

        if (a < 0) {
            if (o < 0) {
                at = 180 + math.abs(at);

            } else  {
                at = 180 - math.abs(at);

            }
        }

        sprite.runaction(cc.rotateto.create(1, at));
    },

    ctor : function () {
        this._super();
        this.init();

        if( 'touches' in cc.sys.capabilities ) {
            cc.eventManager.addListener(cc.EventListener.create({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesEnded:function (touches, event) {
                    if (touches.length <= 0) {
                        return;
                    }

                    event.getCurrentTarget().moveSprite(touches[0].getLocation());
                }
            }), this);

        } else if ('mouse' in cc.sys.capabilities ) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: function (event) {
                    event.getCurrentTarget().moveSprite(event.getLocation());

                }
            }, this);

        }

        var sprite = cc.Sprite.create(res.HelloWorld_png);

        var layer = cc.LayerColor.create(cc.color(255, 255, 0, 100));
        this.addChild(layer, -1);

        this.addChild(sprite, 0, TAG_SPRITE);
        sprite.x = 20;
        sprite.y = 150;

        sprite.runAction(cc.JumpTo.create(4, cc.p(300, 48), 100, 4));

        var fadeIn = cc.FadeIn.create(1);
        var fadeOut = cc.FadeOut.create(1);
        var forever = cc.Sequence.create(fadeIn, fadeOut).repeatForever();
        layer.runAction(forever);

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

