import test from 'node:test';
import assert from 'node:assert/strict';
import {missions,createPreviewProgress} from './missions.mjs';
test('unique mission IDs and Page as level 001',()=>{assert.equal(new Set(missions.map(x=>x.id)).size,missions.length);assert.equal(missions[0].id,'page-001');});
test('unknown and unselected missions cannot be marked',()=>{const p=createPreviewProgress();assert.equal(p.select('unknown'),false);assert.equal(p.markExplored('portland-explore'),false);});
test('local exploration deduplicates and resets',()=>{const p=createPreviewProgress();p.select('portland-explore');p.markExplored('portland-explore');p.markExplored('portland-explore');assert.deepEqual(p.snapshot().explored,['portland-explore']);p.reset();assert.deepEqual(p.snapshot(),{selected:null,explored:[]});});
