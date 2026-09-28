async (page) => {
  const rows=[];
  for(const variant of ['baseline','ai-design-rules']) {
    await page.goto(`http://127.0.0.1:4183/${variant}/`);
    await page.setViewportSize({width:390,height:844});
    await page.waitForFunction(()=>window.__benchmark);
    await page.evaluate(()=>{window.__benchmark.reset('seed');document.activeElement.blur();window.scrollTo(0,0);window.__benchmark.setSaveDelay(1500);window.__benchmark.failNextSave();});
    const input=variant==='baseline'?'#new-task':'#task-title';const button=variant==='baseline'?'#add-button':'#add-task';
    const boxes=async()=>({input:await page.locator(input).boundingBox(),button:await page.locator(button).boundingBox(),firstRow:await page.locator('[data-task-id="t01"]').boundingBox()});
    const initial=await boxes();await page.locator(input).fill('Buy apples');await page.locator(button).click();const saving=await boxes();
    await page.waitForFunction(()=>!window.__benchmark.getState().pending);const failure=await boxes();
    rows.push({variant,initial,saving,failure});
  }
  return {browserVersion:page.context().browser().version(),locale:await page.evaluate(()=>navigator.language),deviceScaleFactor:await page.evaluate(()=>devicePixelRatio),rows};
}
