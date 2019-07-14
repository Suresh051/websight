import test from 'tape';
import toReadableStream from 'to-readable-stream';
import Parser from '../src/parser';
import { readFile } from './helpers/read-file';

/**
 * Parser tests.
 */

test('🧮 Parser — parse() should parse a HTML stream.', async t => {
    t.plan(3);
    const input = await readFile('./fixtures/parser_1.html');
    const htmlStream = toReadableStream(input);
    const parser = new Parser(htmlStream);
    parser.on('end', () => {
        t.pass('`end` event should be emitted to signal parsing complete.');
        t.equal(htmlStream.eventNames().length, 0, '`end` event should\'ve removed all event listeners on input stream.');
        t.end();
    });
    parser.on('link', url => {
        t.equal(url, 'https://github.com/paambaati', 'should emit the only relevant hyperlink on the page.');
    });
    parser.parse();
});

// test('⚗️ Parser — parse() should emit an `error` event when htmlparser2 encounters an error.', async t => {
//     t.plan(1);
//     const input = await readFile('./fixtures/parser_1.html');
//     const htmlStream = toReadableStream(input);
//     const parser = new Parser(htmlStream);

//     parser.on('end', () => {
//         t.pass('`end` event should be emitted to signal parsing complete.');
//         t.equal(htmlStream.eventNames().length, 0, '`end` event should\'ve removed all event listeners on input stream.');
//         t.end();
//     });
//     parser.on('link', url => {
//         t.equal(url, 'https://github.com/paambaati', 'should emit the only relevant hyperlink on the page.');
//     });
//     parser.parse();
// });