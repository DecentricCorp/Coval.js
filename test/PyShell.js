"use strict"
let chai = require('chai')
let expect = chai.expect
let PyShellLib = require('../build/base/PyShell')
let PyShell = PyShellLib.PyShell
let PyShellOptions = PyShellLib.PyShellOptions
let PyShellMode = PyShellLib.Mode

describe('PyShellOptions', () => {
    it('is created sucessfully', () => {
        var options = new PyShellOptions(PyShellMode.Text, 'path/to/python', ['-u'], 'path/to/my/scripts', ['value1', 'value2', 'value3'] )
        expect(options).to.deep.equal(
            {
                mode: 'text',
                pythonPath: 'path/to/python',
                pythonOptions: ['-u'],
                scriptPath: 'path/to/my/scripts',
                args: ['value1', 'value2', 'value3']
            }
        )
    })
    it('should execute simple python script', function(done) {    
        var pyshell = new PyShell()
        pyshell.Run('test/test.py', function(err, msg){
            expect(msg).to.contain('test execution')
            done()
        })
    })

    it('should execute interactive python script', function(done) {    
        var pyshell = new PyShell('test/interactive.py')
        pyshell.Send('Shannon Code', function(msg){
            expect(msg).to.contain('What is your name?')
            expect(msg).to.contain('hello Shannon Code')
            done()
        })
    })
})
