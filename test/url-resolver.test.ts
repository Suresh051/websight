import test from 'tape';
import URLResolver from '../src/url-resolver';

/**
 * URLResolver Tests.
 */

test('📍 URLResolver — constructor() should create `startingUrl`.', t => {
    t.plan(3);
    const input1 = 'example.com';
    const resolver1 = new URLResolver(input1);
    t.equals(resolver1.startingUrl, 'https://example.com', '`https://` should be prepended by default if the protocol isn\'t given.');
    const input2 = 'http://example.com';
    const resolver2 = new URLResolver(input2);
    t.equals(resolver2.startingUrl, 'http://example.com', 'protocol shouldn\'t be touched if the input URL includes it.');
    const input3 = 'http://example.com/';
    const resolver3 = new URLResolver(input2);
    t.equals(resolver3.startingUrl, 'http://example.com', 'trailing slash should be stripped.');
    t.end();
});

test('📍 URLResolver — stripTrailingSlash() should, well, strip the trailing slash.', t => {
    t.plan(1);
    const domain = 'http://example.com/';
    const strippedUrl = new URLResolver(domain).stripTrailingSlash('http://example.com/test/');
    t.equals(strippedUrl, 'http://example.com/test', 'trailing slash should be stripped.');
    t.end();
});

test('📍 URLResolver — getAbsoluteUrl() should resolve the full absolute URL.', t => {
    t.plan(3);
    const input = 'http://example.com';
    const relativePath1 = '/lol';
    const absolutePath1 = new URLResolver(input).getAbsoluteUrl(relativePath1);
    t.equals(absolutePath1, 'http://example.com/lol', 'absolute URL should be resolved correctly for relative paths.');
    const relativePath2 = 'http://example.com/haha';
    const absolutePath2 = new URLResolver(input).getAbsoluteUrl(relativePath2);
    t.equals(absolutePath2, 'http://example.com/haha', 'absolute URL should be resolved correctly for absolute paths.');
    const dataUri = 'data:text/text,aGVsbG8=';
    const absolutePath3 = new URLResolver(input).getAbsoluteUrl(dataUri);
    t.equals(absolutePath3, 'data:text/text,aGVsbG8=', 'absolute URL should not be modifed for data URIs.');
    t.end();
});

test('📍 URLResolver — filterUrlsByDomain() should filter out all non-domain URLs.', t => {
    t.plan(1);
    const domain = 'https://example.com/';
    const links = [
        'https://example.com/1',
        'https://example.com/test/lol',
        'https://search.example.com/haha',
        'https://github.com/',
        'ftp://google.com',
    ];
    const ownUrls = new URLResolver(domain).filterUrlsByDomain(links);
    t.equals(ownUrls.length, 2, 'should return only URLs from same domain.');
    t.end();
});
