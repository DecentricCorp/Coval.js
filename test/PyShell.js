"use strict"
let chai = require('chai')
let expect = chai.expect
let PyShellLib = require('../build/base/PyShell')
let PyShell = PyShellLib.PyShell
let PyShellOptions = PyShellLib.PyShellOptions
let PyShellMode = PyShellLib.Mode

describe('PyShellOptions', () => {
    it('Is created successfully', () => {
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
    it('Executes a simple python script', function(done) {    
        var pyshell = new PyShell()
        pyshell.Run('test/test.py', function(err, msg){
            expect(msg).to.contain('test execution')
            done()
        })
    })

    it('Executes an interactive python script', function(done) {    
        var pyshell = new PyShell('test/interactive.py')
        pyshell.Send('Shannon Code', function(msg){
            expect(msg).to.contain('What is your name?')
            expect(msg).to.contain('hello Shannon Code')
            done()
        })
    })
})
