var FooController = {

    index: function(req, res) {
        Foo.find().done(function(err, foos){
            var context = {
                foos: foos
            }
            res.view('foo/index', context);
        });
    },

    new: function(req, res){
        res.view('foo/new');
    },

    create: function(req, res){
    	var foo = Foo.create({
    		name: req.param('name'),
    		email: req.param('email'),
    	}).done(function(err, foo){
    		if(err){
    			console.log(err);
    		} else {
    			res.redirect('/foo/' + foo.id);
    		}
    	});
    },

    show: function(req, res){
        var id = req.param('id');
        if (!id) return res.send("No id specified.", 500);

        Foo.findOne({id: id}).done(function(err, foo){
            if(err) return res.sender(err,500);
            if(!foo) return res.send("Foo "+id+" not found", 404);

            var context = {
                foo: foo
            }
            res.view('foo/show', context);
        })
    },

    edit: function(req, res){
        var id = req.param('id');
        if (!id) return res.send("No id specified.", 500);

        Foo.findOne({id: id}).done(function(err, foo){
            if(err) return res.sender(err,500);
            if(!foo) return res.send("Foo "+id+" not found", 404);

            var context = {
                foo: foo
            }
            res.view('foo/edit', context);
        })
    },

    update: function(req, res){
        var id = req.param('id');
        if (!id) return res.send("No id specified.", 500);

        Foo.update(
            {
                id: id
            },
            {
                name: req.param('name'),
                email: req.param('email')
            }, function(err, note){
                console.log(err);
                if(err){
                    res.redirect('/foo/' + id + '/edit');
                } else {
                    res.redirect('/foo/show/' + id);
                }
            }
        );
    },

    destroy: function(req, res){
        var id = req.param('id');
        if (!id) return res.send("No id specified.", 500);

        Foo.destroy({
            id: id
        }).done(function(err){
            if(err){
                console.log(err);
            }

            res.redirect('/foo');
        })
    }
}

module.exports = FooController;
