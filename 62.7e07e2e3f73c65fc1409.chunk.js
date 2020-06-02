(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{354:function(n,s,a){"use strict";a.r(s),s.default='<p>A loader is a node module that exports a function. This function is called when a resource should be transformed by this loader. The given function will have access to the <a href="/api/loaders/">Loader API</a> using the <code>this</code> context provided to it.</p>\n<h2 id="setup">Setup<a href="#setup" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Before we dig into the different types of loaders, their usage, and examples, let\'s take a look at the three ways you can develop and test a loader locally.</p>\n<p>To test a single loader, you can simply use <code>path</code> to <code>resolve</code> a local file within a rule object:</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'path\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token punctuation">:</span> <span class="token regex">/\\.js$/</span><span class="token punctuation">,</span>\n        use<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n          <span class="token punctuation">{</span>\n            loader<span class="token punctuation">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">\'path/to/loader.js\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n            options<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token comment">/* ... */</span><span class="token punctuation">}</span>\n          <span class="token punctuation">}</span>\n        <span class="token punctuation">]</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>To test multiple, you can utilize the <code>resolveLoader.modules</code> configuration to update where webpack will search for loaders. For example, if you had a local <code>/loaders</code> directory in your project:</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'path\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  resolveLoader<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    modules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token string">\'node_modules\'</span><span class="token punctuation">,</span>\n      path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">\'loaders\'</span><span class="token punctuation">)</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>Last but not least, if you\'ve already created a separate repository and package for your loader, you could <a href="https://docs.npmjs.com/cli/link"><code>npm link</code></a> it to the project in which you\'d like to test it out.</p>\n<blockquote class="tip">\n<p>You can use <a href="https://github.com/webpack-contrib/webpack-defaults"><code>webpack-defaults</code> package</a> to generate boilerplate code necessary to start writing your loader.</p>\n</blockquote>\n<h2 id="simple-usage">Simple Usage<a href="#simple-usage" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>When a single loader is applied to the resource, the loader is called with only one parameter -- a string containing the content of the resource file.</p>\n<p>Synchronous loaders can simply <code>return</code> a single value representing the transformed module. In more complex cases, the loader can return any number of values by using the <code>this.callback(err, values...)</code> function. Errors are either passed to the <code>this.callback</code> function or thrown in a sync loader.</p>\n<p>The loader is expected to give back one or two values. The first value is a resulting JavaScript code as string or buffer. The second optional value is a SourceMap as JavaScript object.</p>\n<h2 id="complex-usage">Complex Usage<a href="#complex-usage" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>When multiple loaders are chained, it is important to remember that they are executed in reverse order -- either right to left or bottom to top depending on array format.</p>\n<ul>\n<li>The last loader, called first, will be passed the contents of the raw resource.</li>\n<li>The first loader, called last, is expected to return JavaScript and an optional source map.</li>\n<li>The loaders in between will be executed with the result(s) of the previous loader in the chain.</li>\n</ul>\n<p>So, in the following example, the <code>foo-loader</code> would be passed the raw resource and the <code>bar-loader</code> would receive the output of the <code>foo-loader</code> and return the final transformed module and a source map if necessary.</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token punctuation">:</span> <span class="token regex">/\\.js/</span><span class="token punctuation">,</span>\n        use<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n          <span class="token string">\'bar-loader\'</span><span class="token punctuation">,</span>\n          <span class="token string">\'foo-loader\'</span>\n        <span class="token punctuation">]</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<h2 id="guidelines">Guidelines<a href="#guidelines" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>The following guidelines should be followed when writing a loader. They are ordered in terms of importance and some only apply in certain scenarios, read the detailed sections that follow for more information.</p>\n<ul>\n<li>Keep them <strong>simple</strong>.</li>\n<li>Utilize <strong>chaining</strong>.</li>\n<li>Emit <strong>modular</strong> output.</li>\n<li>Make sure they\'re <strong>stateless</strong>.</li>\n<li>Employ <strong>loader utilities</strong>.</li>\n<li>Mark <strong>loader dependencies</strong>.</li>\n<li>Resolve <strong>module dependencies</strong>.</li>\n<li>Extract <strong>common code</strong>.</li>\n<li>Avoid <strong>absolute paths</strong>.</li>\n<li>Use <strong>peer dependencies</strong>.</li>\n</ul>\n<h3 id="simple">Simple<a href="#simple" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Loaders should do only a single task. This not only makes the job of maintaining each loader easier, but also allows them to be chained for usage in more scenarios.</p>\n<h3 id="chaining">Chaining<a href="#chaining" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Take advantage of the fact that loaders can be chained together. Instead of writing a single loader that tackles five tasks, write five simpler loaders that divide this effort. Isolating them not only keeps each individual loader simple, but may allow for them to be used for something you hadn\'t thought of originally.</p>\n<p>Take the case of rendering a template file with data specified via loader options or query parameters. It could be written as a single loader that compiles the template from source, executes it and returns a module that exports a string containing the HTML code. However, in accordance with guidelines, a simple <code>apply-loader</code> exists that can be chained with other open source loaders:</p>\n<ul>\n<li><code>pug-loader</code>: Convert template to a module that exports a function.</li>\n<li><code>apply-loader</code>: Executes the function with loader options and returns raw HTML.</li>\n<li><code>html-loader</code>: Accepts HTML and outputs a valid JavaScript module.</li>\n</ul>\n<blockquote class="tip">\n<p>The fact that loaders can be chained also means they don\'t necessarily have to output JavaScript. As long as the next loader in the chain can handle its output, the loader can return any type of module.</p>\n</blockquote>\n<h3 id="modular">Modular<a href="#modular" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Keep the output modular. Loader generated modules should respect the same design principles as normal modules.</p>\n<h3 id="stateless">Stateless<a href="#stateless" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Make sure the loader does not retain state between module transformations. Each run should always be independent of other compiled modules as well as previous compilations of the same module.</p>\n<h3 id="loader-utilities">Loader Utilities<a href="#loader-utilities" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Take advantage of the <a href="https://github.com/webpack/loader-utils"><code>loader-utils</code></a> package. It provides a variety of useful tools but one of the most common is retrieving the options passed to the loader. Along with <code>loader-utils</code>, the <a href="https://github.com/webpack-contrib/schema-utils"><code>schema-utils</code></a> package should be used for consistent JSON Schema based validation of loader options. Here\'s a brief example that utilizes both:</p>\n<p><strong>loader.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> getOptions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'loader-utils\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> validateOptions <span class="token keyword">from</span> <span class="token string">\'schema-utils\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> schema <span class="token operator">=</span> <span class="token punctuation">{</span>\n  type<span class="token punctuation">:</span> <span class="token string">\'object\'</span><span class="token punctuation">,</span>\n  properties<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    test<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      type<span class="token punctuation">:</span> <span class="token string">\'string\'</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token function">getOptions</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token function">validateOptions</span><span class="token punctuation">(</span>schema<span class="token punctuation">,</span> options<span class="token punctuation">,</span> <span class="token string">\'Example Loader\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token comment">// Apply some transformations to the source...</span>\n\n  <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`export default </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span> <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n<h3 id="loader-dependencies">Loader Dependencies<a href="#loader-dependencies" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>If a loader uses external resources (i.e. by reading from filesystem), they <strong>must</strong> indicate it. This information is used to invalidate cacheable loaders and recompile in watch mode. Here\'s a brief example of how to accomplish this using the <code>addDependency</code> method:</p>\n<p><strong>loader.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">import</span> path <span class="token keyword">from</span> <span class="token string">\'path\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> callback <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token keyword">async</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">var</span> headerPath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">\'header.js\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addDependency</span><span class="token punctuation">(</span>headerPath<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span>headerPath<span class="token punctuation">,</span> <span class="token string">\'utf-8\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> header<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">callback</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> header <span class="token operator">+</span> <span class="token string">\'\\n\'</span> <span class="token operator">+</span> source<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n<h3 id="module-dependencies">Module Dependencies<a href="#module-dependencies" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Depending on the type of module, there may be a different schema used to specify dependencies. In CSS for example, the <code>@import</code> and <code>url(...)</code> statements are used. These dependencies should be resolved by the module system.</p>\n<p>This can be done in one of two ways:</p>\n<ul>\n<li>By transforming them to <code>require</code> statements.</li>\n<li>Using the <code>this.resolve</code> function to resolve the path.</li>\n</ul>\n<p>The <code>css-loader</code> is a good example of the first approach. It transforms dependencies to <code>require</code>s, by replacing <code>@import</code> statements with a <code>require</code> to the other stylesheet and <code>url(...)</code> with a <code>require</code> to the referenced file.</p>\n<p>In the case of the <code>less-loader</code>, it cannot transform each <code>@import</code> to a <code>require</code> because all <code>.less</code> files must be compiled in one pass for variables and mixin tracking. Therefore, the <code>less-loader</code> extends the less compiler with custom path resolving logic. It then takes advantage of the second approach, <code>this.resolve</code>, to resolve the dependency through webpack.</p>\n<blockquote class="tip">\n<p>If the language only accepts relative urls (e.g. <code>url(file)</code> always refers to <code>./file</code>), you can use the <code>~</code> convention to specify references to installed modules (e.g. those in <code>node_modules</code>). So, in the case of <code>url</code>, that would look something like <code>url(\'~some-library/image.jpg\')</code>.</p>\n</blockquote>\n<h3 id="common-code">Common Code<a href="#common-code" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Avoid generating common code in every module the loader processes. Instead, create a runtime file in the loader and generate a <code>require</code> to that shared module:</p>\n<p><strong>src/loader-runtime.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">const</span> <span class="token punctuation">{</span>someOtherModule<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'./some-other-module\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nmodule<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">runtime</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> x <span class="token operator">=</span> params<span class="token punctuation">.</span>y <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token function">someOtherModule</span><span class="token punctuation">(</span>params<span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p><strong>src/loader.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">import</span> runtime <span class="token keyword">from</span> <span class="token string">\'./loader-runtime.js\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">loader</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Custom loader logic</span>\n\n  <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">runtime</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    source<span class="token punctuation">,</span>\n    y<span class="token punctuation">:</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)}`</span></span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n<h3 id="absolute-paths">Absolute Paths<a href="#absolute-paths" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Don\'t insert absolute paths into the module code as they break hashing when the root for the project is moved. There\'s a <a href="https://github.com/webpack/loader-utils#stringifyrequest"><code>stringifyRequest</code></a> method in <code>loader-utils</code> which can be used to convert an absolute path to a relative one.</p>\n<h3 id="peer-dependencies">Peer Dependencies<a href="#peer-dependencies" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>If the loader you\'re working on is a simple wrapper around another package, then you should include the package as a <code>peerDependency</code>. This approach allows the application\'s developer to specify the exact version in the <code>package.json</code> if desired.</p>\n<p>For instance, the <code>sass-loader</code> <a href="https://github.com/webpack-contrib/sass-loader/blob/master/package.json">specifies <code>node-sass</code></a> as peer dependency like so:</p>\n<pre><code class="hljs language-json"><span class="token punctuation">{</span>\n  <span class="token property">"peerDependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"node-sass"</span><span class="token operator">:</span> <span class="token string">"^4.0.0"</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n<h2 id="testing">Testing<a href="#testing" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>So you\'ve written a loader, followed the guidelines above, and have it set up to run locally. What\'s next? Let\'s go through a simple unit testing example to ensure our loader is working the way we expect. We\'ll be using the <a href="https://jestjs.io/">Jest</a> framework to do this. We\'ll also install <code>babel-jest</code> and some presets that will allow us to use the <code>import</code> / <code>export</code> and <code>async</code> / <code>await</code>. Let\'s start by installing and saving these as a <code>devDependencies</code>:</p>\n<pre><code class="hljs language-bash"><span class="token function">npm</span> <span class="token function">install</span> --save-dev jest babel-jest @babel/core @babel/preset-env</code></pre>\n<p><strong>babel.config.js</strong></p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  presets<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">[</span>\n      <span class="token string">\'@babel/preset-env\'</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        targets<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n          node<span class="token punctuation">:</span> <span class="token string">\'current\'</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>Our loader will process <code>.txt</code> files and simply replace any instance of <code>[name]</code> with the <code>name</code> option given to the loader. Then it will output a valid JavaScript module containing the text as its default export:</p>\n<p><strong>src/loader.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> getOptions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'loader-utils\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">loader</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token function">getOptions</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  source <span class="token operator">=</span> source<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex">/\\[name\\]/g</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`export default </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span> <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n<p>We\'ll use this loader to process the following file:</p>\n<p><strong>test/example.txt</strong></p>\n<pre><code class="hljs language-bash">Hey <span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token operator">!</span></code></pre>\n<p>Pay close attention to this next step as we\'ll be using the <a href="/api/node">Node.js API</a> and <a href="https://github.com/streamich/memfs"><code>memfs</code></a> to execute webpack. This lets us avoid emitting <code>output</code> to disk and will give us access to the <code>stats</code> data which we can use to grab our transformed module:</p>\n<pre><code class="hljs language-bash"><span class="token function">npm</span> <span class="token function">install</span> --save-dev webpack memfs</code></pre>\n<p><strong>test/compiler.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">import</span> path <span class="token keyword">from</span> <span class="token string">\'path\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> webpack <span class="token keyword">from</span> <span class="token string">\'webpack\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> createFsFromVolume<span class="token punctuation">,</span> Volume <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'memfs\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span>fixture<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> compiler <span class="token operator">=</span> <span class="token function">webpack</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    context<span class="token punctuation">:</span> __dirname<span class="token punctuation">,</span>\n    entry<span class="token punctuation">:</span> <span class="token template-string"><span class="token string">`./</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>fixture<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">,</span>\n    output<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      path<span class="token punctuation">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">)</span><span class="token punctuation">,</span>\n      filename<span class="token punctuation">:</span> <span class="token string">\'bundle.js\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      rules<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>\n        test<span class="token punctuation">:</span> <span class="token regex">/\\.txt$/</span><span class="token punctuation">,</span>\n        use<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n          loader<span class="token punctuation">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">\'../src/loader.js\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n          options<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n            name<span class="token punctuation">:</span> <span class="token string">\'Alice\'</span>\n          <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span><span class="token punctuation">]</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  compiler<span class="token punctuation">.</span>outputFileSystem <span class="token operator">=</span> <span class="token function">createFsFromVolume</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Volume</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  compiler<span class="token punctuation">.</span>outputFileSystem<span class="token punctuation">.</span>join <span class="token operator">=</span> path<span class="token punctuation">.</span>join<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    compiler<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> stats<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>stats<span class="token punctuation">.</span><span class="token function">hasErrors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>stats<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>errors<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n      <span class="token function">resolve</span><span class="token punctuation">(</span>stats<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<blockquote class="tip">\n<p>In this case, we\'ve inlined our webpack configuration but you can also accept a configuration as a parameter to the exported function. This would allow you to test multiple setups using the same compiler module.</p>\n</blockquote>\n<p>And now, finally, we can write our test and add an npm script to run it:</p>\n<p><strong>test/loader.test.js</strong></p>\n<pre><code class="hljs language-js"><span class="token comment">/**\n * @jest-environment node\n */</span>\n<span class="token keyword">import</span> compiler <span class="token keyword">from</span> <span class="token string">\'./compiler.js\'</span><span class="token punctuation">;</span>\n\n<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">\'Inserts name and outputs JavaScript\'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> stats <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">compiler</span><span class="token punctuation">(</span><span class="token string">\'example.txt\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">const</span> output <span class="token operator">=</span> stats<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>modules<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>source<span class="token punctuation">;</span>\n\n  <span class="token function">expect</span><span class="token punctuation">(</span>output<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">\'export default "Hey Alice!\\"\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p><strong>package.json</strong></p>\n<pre><code class="hljs language-json"><span class="token punctuation">{</span>\n  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"test"</span><span class="token operator">:</span> <span class="token string">"jest"</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n<p>With everything in place, we can run it and see if our new loader passes the test:</p>\n<pre><code class="hljs language-bash"> PASS  test/loader.test.js\n  ✓ Inserts name and outputs JavaScript <span class="token punctuation">(</span>229ms<span class="token punctuation">)</span>\n\nTest Suites: 1 passed, 1 total\nTests:       1 passed, 1 total\nSnapshots:   0 total\nTime:        1.853s, estimated 2s\nRan all <span class="token function">test</span> suites.</code></pre>\n<p>It worked! At this point you should be ready to start developing, testing, and deploying your own loaders. We hope that you\'ll share your creations with the rest of the community!</p>\n'}}]);