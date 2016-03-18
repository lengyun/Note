var klass = require('./klass')

klass.add('Chris',['小明','小红']);
exports.add=function(klasses){
	klasses.forEach(function(item,index){
		var _klass= item;
		var teacherName=item.teacherName;
		var student=item.student;
		klass.add(teacherName,student)
	})
}