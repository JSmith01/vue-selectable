# List of known issues

* Bounding box is set to element of `v-selectable` - it should be possible to set 
  it separately
* Make absBox() results on `selectables[]` and `boundingBox` cacheable (ala autoRefresh: off in
  jQuery Selectable) - add flag `.static` to directive 
* Every mouse click is hijacked, thus preventing from making usual links/buttons.
  Needs to prevent only selection?
