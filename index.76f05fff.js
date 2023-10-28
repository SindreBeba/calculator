var t,e,n,i,r,o,s,a=globalThis;// Enum object for button tag values
const c=Object.freeze({// Operators
ADD:"add",SUBTRACT:"subtract",MULTIPLY:"multiply",DIVIDE:"divide",// Other buttons
CLEAR:"clear",BACKSPACE:"back",EQUALS:"equals",DECIMAL:"decimal",SIGN:"sign",MEMORY_CLEAR:"memory-clear",MEMORY_RECALL:"memory-recall",MEMORY_PLUS:"memory-plus",MEMORY_MINUS:"memory-minus",isOperator(t){return[this.ADD,this.SUBTRACT,this.MULTIPLY,this.DIVIDE].includes(t)},isNumber:t=>1==t.length&&!isNaN(parseInt(t)),isInput(t){return[this.BACKSPACE,this.DECIMAL].includes(t)||this.isNumber(t)},toString(t){switch(t){case c.ADD:return"+";case c.SUBTRACT:return"-";case c.MULTIPLY:return"\xd7";case c.DIVIDE:return"\xf7";default:console.error("Unkown operator error")}}});var u={};!function(t){/*!
   *  decimal.js v10.4.3
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   */// -----------------------------------  EDITABLE DEFAULTS  ------------------------------------ //
// The maximum exponent magnitude.
// The limit on the value of `toExpNeg`, `toExpPos`, `minE` and `maxE`.
var e,n,i,r,o="0123456789abcdef",s="2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",a="3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",c={// These values must be integers within the stated ranges (inclusive).
// Most of these values can be changed at run-time using the `Decimal.config` method.
// The maximum number of significant digits of the result of a calculation or base conversion.
// E.g. `Decimal.config({ precision: 20 });`
precision:20,// The rounding mode used when rounding to `precision`.
//
// ROUND_UP         0 Away from zero.
// ROUND_DOWN       1 Towards zero.
// ROUND_CEIL       2 Towards +Infinity.
// ROUND_FLOOR      3 Towards -Infinity.
// ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
// ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
// ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
// ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
// ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
//
// E.g.
// `Decimal.rounding = 4;`
// `Decimal.rounding = Decimal.ROUND_HALF_UP;`
rounding:4,// The modulo mode used when calculating the modulus: a mod n.
// The quotient (q = a / n) is calculated according to the corresponding rounding mode.
// The remainder (r) is calculated as: r = a - n * q.
//
// UP         0 The remainder is positive if the dividend is negative, else is negative.
// DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
// FLOOR      3 The remainder has the same sign as the divisor (Python %).
// HALF_EVEN  6 The IEEE 754 remainder function.
// EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
//
// Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
// division (9) are commonly used for the modulus operation. The other rounding modes can also
// be used, but they may not give useful results.
modulo:1,// The exponent value at and beneath which `toString` returns exponential notation.
// JavaScript numbers: -7
toExpNeg:-7,// The exponent value at and above which `toString` returns exponential notation.
// JavaScript numbers: 21
toExpPos:21,// The minimum exponent value, beneath which underflow to zero occurs.
// JavaScript numbers: -324  (5e-324)
minE:-9e15,// The maximum exponent value, above which overflow to Infinity occurs.
// JavaScript numbers: 308  (1.7976931348623157e+308)
maxE:9e15,// Whether to use cryptographically-secure random number generation, if available.
crypto:!1// true/false
},h=!0,l="[DecimalError] ",d=l+"Invalid argument: ",f=l+"Precision limit exceeded",p=l+"crypto unavailable",v="[object Decimal]",y=Math.floor,g=Math.pow,m=/^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,w=/^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,b=/^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,x=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,S=s.length-1,E=a.length-1,O={toStringTag:v};// Helper functions for Decimal.prototype (P) and/or Decimal methods, and their callers.
/*
   *  digitsToString           P.cubeRoot, P.logarithm, P.squareRoot, P.toFraction, P.toPower,
   *                           finiteToString, naturalExponential, naturalLogarithm
   *  checkInt32               P.toDecimalPlaces, P.toExponential, P.toFixed, P.toNearest,
   *                           P.toPrecision, P.toSignificantDigits, toStringBinary, random
   *  checkRoundingDigits      P.logarithm, P.toPower, naturalExponential, naturalLogarithm
   *  convertBase              toStringBinary, parseOther
   *  cos                      P.cos
   *  divide                   P.atanh, P.cubeRoot, P.dividedBy, P.dividedToIntegerBy,
   *                           P.logarithm, P.modulo, P.squareRoot, P.tan, P.tanh, P.toFraction,
   *                           P.toNearest, toStringBinary, naturalExponential, naturalLogarithm,
   *                           taylorSeries, atan2, parseOther
   *  finalise                 P.absoluteValue, P.atan, P.atanh, P.ceil, P.cos, P.cosh,
   *                           P.cubeRoot, P.dividedToIntegerBy, P.floor, P.logarithm, P.minus,
   *                           P.modulo, P.negated, P.plus, P.round, P.sin, P.sinh, P.squareRoot,
   *                           P.tan, P.times, P.toDecimalPlaces, P.toExponential, P.toFixed,
   *                           P.toNearest, P.toPower, P.toPrecision, P.toSignificantDigits,
   *                           P.truncated, divide, getLn10, getPi, naturalExponential,
   *                           naturalLogarithm, ceil, floor, round, trunc
   *  finiteToString           P.toExponential, P.toFixed, P.toPrecision, P.toString, P.valueOf,
   *                           toStringBinary
   *  getBase10Exponent        P.minus, P.plus, P.times, parseOther
   *  getLn10                  P.logarithm, naturalLogarithm
   *  getPi                    P.acos, P.asin, P.atan, toLessThanHalfPi, atan2
   *  getPrecision             P.precision, P.toFraction
   *  getZeroString            digitsToString, finiteToString
   *  intPow                   P.toPower, parseOther
   *  isOdd                    toLessThanHalfPi
   *  maxOrMin                 max, min
   *  naturalExponential       P.naturalExponential, P.toPower
   *  naturalLogarithm         P.acosh, P.asinh, P.atanh, P.logarithm, P.naturalLogarithm,
   *                           P.toPower, naturalExponential
   *  nonFiniteToString        finiteToString, toStringBinary
   *  parseDecimal             Decimal
   *  parseOther               Decimal
   *  sin                      P.sin
   *  taylorSeries             P.cosh, P.sinh, cos, sin
   *  toLessThanHalfPi         P.cos, P.sin
   *  toStringBinary           P.toBinary, P.toHexadecimal, P.toOctal
   *  truncate                 intPow
   *
   *  Throws:                  P.logarithm, P.precision, P.toFraction, checkInt32, getLn10, getPi,
   *                           naturalLogarithm, config, parseOther, random, Decimal
   */function N(t){var e,n,i,r=t.length-1,o="",s=t[0];if(r>0){for(o+=s,e=1;e<r;e++)(n=7-(i=t[e]+"").length)&&(o+=I(n)),o+=i;(n=7-(i=(s=t[e])+"").length)&&(o+=I(n))}else if(0===s)return"0";// Remove trailing zeros of last w.
for(;s%10==0;)s/=10;return o+s}function _(t,e,n){if(t!==~~t||t<e||t>n)throw Error(d+t)}/*
   * Check 5 rounding digits if `repeating` is null, 4 otherwise.
   * `repeating == null` if caller is `log` or `pow`,
   * `repeating != null` if caller is `naturalLogarithm` or `naturalExponential`.
   */function M(t,e,n,i){var r,o,s,a;// Get the length of the first word of the array d.
for(o=t[0];o>=10;o/=10)--e;return--e<0?(e+=7,r=0):(r=Math.ceil((e+1)/7),e%=7),// i is the index (0 - 6) of the rounding digit.
// E.g. if within the word 3487563 the first rounding digit is 5,
// then i = 4, k = 1000, rd = 3487563 % 1000 = 563
o=g(10,7-e),a=t[r]%o|0,null==i?e<3?(0==e?a=a/100|0:1==e&&(a=a/10|0),s=n<4&&99999==a||n>3&&49999==a||5e4==a||0==a):s=(n<4&&a+1==o||n>3&&a+1==o/2)&&(t[r+1]/o/100|0)==g(10,e-2)-1||(a==o/2||0==a)&&(t[r+1]/o/100|0)==0:e<4?(0==e?a=a/1e3|0:1==e?a=a/100|0:2==e&&(a=a/10|0),s=(i||n<4)&&9999==a||!i&&n>3&&4999==a):s=((i||n<4)&&a+1==o||!i&&n>3&&a+1==o/2)&&(t[r+1]/o/1e3|0)==g(10,e-3)-1,s}// Convert string of `baseIn` to an array of numbers of `baseOut`.
// Eg. convertBase('255', 10, 16) returns [15, 15].
// Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
function A(t,e,n){for(var i,r,s=[0],a=0,c=t.length;a<c;){for(r=s.length;r--;)s[r]*=e;for(s[0]+=o.indexOf(t.charAt(a++)),i=0;i<s.length;i++)s[i]>n-1&&(void 0===s[i+1]&&(s[i+1]=0),s[i+1]+=s[i]/n|0,s[i]%=n)}return s.reverse()}// Decimal prototype methods
/*
   *  absoluteValue             abs
   *  ceil
   *  clampedTo                 clamp
   *  comparedTo                cmp
   *  cosine                    cos
   *  cubeRoot                  cbrt
   *  decimalPlaces             dp
   *  dividedBy                 div
   *  dividedToIntegerBy        divToInt
   *  equals                    eq
   *  floor
   *  greaterThan               gt
   *  greaterThanOrEqualTo      gte
   *  hyperbolicCosine          cosh
   *  hyperbolicSine            sinh
   *  hyperbolicTangent         tanh
   *  inverseCosine             acos
   *  inverseHyperbolicCosine   acosh
   *  inverseHyperbolicSine     asinh
   *  inverseHyperbolicTangent  atanh
   *  inverseSine               asin
   *  inverseTangent            atan
   *  isFinite
   *  isInteger                 isInt
   *  isNaN
   *  isNegative                isNeg
   *  isPositive                isPos
   *  isZero
   *  lessThan                  lt
   *  lessThanOrEqualTo         lte
   *  logarithm                 log
   *  [maximum]                 [max]
   *  [minimum]                 [min]
   *  minus                     sub
   *  modulo                    mod
   *  naturalExponential        exp
   *  naturalLogarithm          ln
   *  negated                   neg
   *  plus                      add
   *  precision                 sd
   *  round
   *  sine                      sin
   *  squareRoot                sqrt
   *  tangent                   tan
   *  times                     mul
   *  toBinary
   *  toDecimalPlaces           toDP
   *  toExponential
   *  toFixed
   *  toFraction
   *  toHexadecimal             toHex
   *  toNearest
   *  toNumber
   *  toOctal
   *  toPower                   pow
   *  toPrecision
   *  toSignificantDigits       toSD
   *  toString
   *  truncated                 trunc
   *  valueOf                   toJSON
   *//*
   * Return a new Decimal whose value is the absolute value of this Decimal.
   *
   */O.absoluteValue=O.abs=function(){var t=new this.constructor(this);return t.s<0&&(t.s=1),T(t)},/*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
   * direction of positive Infinity.
   *
   */O.ceil=function(){return T(new this.constructor(this),this.e+1,2)},/*
   * Return a new Decimal whose value is the value of this Decimal clamped to the range
   * delineated by `min` and `max`.
   *
   * min {number|string|Decimal}
   * max {number|string|Decimal}
   *
   */O.clampedTo=O.clamp=function(t,e){var n=this.constructor;if(t=new n(t),e=new n(e),!t.s||!e.s)return new n(NaN);if(t.gt(e))throw Error(d+e);return 0>this.cmp(t)?t:this.cmp(e)>0?e:new n(this)},/*
   * Return
   *   1    if the value of this Decimal is greater than the value of `y`,
   *  -1    if the value of this Decimal is less than the value of `y`,
   *   0    if they have the same value,
   *   NaN  if the value of either Decimal is NaN.
   *
   */O.comparedTo=O.cmp=function(t){var e,n,i,r,o=this.d,s=(t=new this.constructor(t)).d,a=this.s,c=t.s;// Either NaN or ±Infinity?
if(!o||!s)return a&&c?a!==c?a:o===s?0:!o^a<0?1:-1:NaN;// Either zero?
if(!o[0]||!s[0])return o[0]?a:s[0]?-c:0;// Signs differ?
if(a!==c)return a;// Compare exponents.
if(this.e!==t.e)return this.e>t.e^a<0?1:-1;// Compare digit by digit.
for(e=0,n=(i=o.length)<(r=s.length)?i:r;e<n;++e)if(o[e]!==s[e])return o[e]>s[e]^a<0?1:-1;// Compare lengths.
return i===r?0:i>r^a<0?1:-1},/*
   * Return a new Decimal whose value is the cosine of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * cos(0)         = 1
   * cos(-0)        = 1
   * cos(Infinity)  = NaN
   * cos(-Infinity) = NaN
   * cos(NaN)       = NaN
   *
   */O.cosine=O.cos=function(){var t,e,n=this,i=n.constructor;return n.d?n.d[0]?(t=i.precision,e=i.rounding,i.precision=t+Math.max(n.e,n.sd())+7,i.rounding=1,n=/*
   * cos(x) = 1 - x^2/2! + x^4/4! - ...
   * |x| < pi/2
   *
   */function(t,e){var n,i,r;if(e.isZero())return e;// Argument reduction: cos(4x) = 8*(cos^4(x) - cos^2(x)) + 1
// i.e. cos(x) = 8*(cos^4(x/4) - cos^2(x/4)) + 1
// Estimate the optimum number of times to use the argument reduction.
(i=e.d.length)<32?r=(1/$(4,n=Math.ceil(i/3))).toString():(n=16,r="2.3283064365386962890625e-10"),t.precision+=n,e=Z(t,1,e.times(r),new t(1));// Reverse argument reduction
for(var o=n;o--;){var s=e.times(e);e=s.times(s).minus(s).times(8).plus(1)}return t.precision-=n,e}(i,z(i,n)),i.precision=t,i.rounding=e,T(2==r||3==r?n.neg():n,t,e,!0)):new i(1):new i(NaN)},/*
   *
   * Return a new Decimal whose value is the cube root of the value of this Decimal, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   *  cbrt(0)  =  0
   *  cbrt(-0) = -0
   *  cbrt(1)  =  1
   *  cbrt(-1) = -1
   *  cbrt(N)  =  N
   *  cbrt(-I) = -I
   *  cbrt(I)  =  I
   *
   * Math.cbrt(x) = (x < 0 ? -Math.pow(-x, 1/3) : Math.pow(x, 1/3))
   *
   */O.cubeRoot=O.cbrt=function(){var t,e,n,i,r,o,s,a,c,u,l=this.constructor;if(!this.isFinite()||this.isZero())return new l(this);// Halley's method.
// TODO? Compare Newton's method.
for(h=!1,// Initial estimate.
(o=this.s*g(this.s*this,1/3))&&Math.abs(o)!=1/0?i=new l(o.toString()):(n=N(this.d),(o=((t=this.e)-n.length+1)%3)&&(n+=1==o||-2==o?"0":"00"),o=g(n,1/3),// Rarely, e may be one less than the result exponent value.
t=y((t+1)/3)-(t%3==(t<0?-1:2)),(i=new l(n=o==1/0?"5e"+t:(n=o.toExponential()).slice(0,n.indexOf("e")+1)+t)).s=this.s),s=(t=l.precision)+3;;)// TODO? Replace with for-loop and checkRoundingDigits.
if(i=R((u=(c=(a=i).times(a).times(a)).plus(this)).plus(this).times(a),u.plus(c),s+2,1),N(a.d).slice(0,s)===(n=N(i.d)).slice(0,s)){// The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or 4999
// , i.e. approaching a rounding boundary, continue the iteration.
if("9999"!=(n=n.slice(s-3,s+1))&&(r||"4999"!=n)){// If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
// If not, then there are further digits and m will be truthy.
+n&&(+n.slice(1)||"5"!=n.charAt(0))||(// Truncate to the first rounding digit.
T(i,t+1,1),e=!i.times(i).times(i).eq(this));break}// On the first iteration only, check to see if rounding up gives the exact result as the
// nines may infinitely repeat.
if(!r&&(T(a,t+1,0),a.times(a).times(a).eq(this))){i=a;break}s+=4,r=1}return h=!0,T(i,t,l.rounding,e)},/*
   * Return the number of decimal places of the value of this Decimal.
   *
   */O.decimalPlaces=O.dp=function(){var t,e=this.d,n=NaN;if(e){if(n=((t=e.length-1)-y(this.e/7))*7,// Subtract the number of trailing zeros of the last word.
t=e[t])for(;t%10==0;t/=10)n--;n<0&&(n=0)}return n},/*
   *  n / 0 = I
   *  n / N = N
   *  n / I = 0
   *  0 / n = 0
   *  0 / 0 = N
   *  0 / N = N
   *  0 / I = 0
   *  N / n = N
   *  N / 0 = N
   *  N / N = N
   *  N / I = N
   *  I / n = I
   *  I / 0 = I
   *  I / N = N
   *  I / I = N
   *
   * Return a new Decimal whose value is the value of this Decimal divided by `y`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   */O.dividedBy=O.div=function(t){return R(this,new this.constructor(t))},/*
   * Return a new Decimal whose value is the integer part of dividing the value of this Decimal
   * by the value of `y`, rounded to `precision` significant digits using rounding mode `rounding`.
   *
   */O.dividedToIntegerBy=O.divToInt=function(t){var e=this.constructor;return T(R(this,new e(t),0,1,1),e.precision,e.rounding)},/*
   * Return true if the value of this Decimal is equal to the value of `y`, otherwise return false.
   *
   */O.equals=O.eq=function(t){return 0===this.cmp(t)},/*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
   * direction of negative Infinity.
   *
   */O.floor=function(){return T(new this.constructor(this),this.e+1,3)},/*
   * Return true if the value of this Decimal is greater than the value of `y`, otherwise return
   * false.
   *
   */O.greaterThan=O.gt=function(t){return this.cmp(t)>0},/*
   * Return true if the value of this Decimal is greater than or equal to the value of `y`,
   * otherwise return false.
   *
   */O.greaterThanOrEqualTo=O.gte=function(t){var e=this.cmp(t);return 1==e||0===e},/*
   * Return a new Decimal whose value is the hyperbolic cosine of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [1, Infinity]
   *
   * cosh(x) = 1 + x^2/2! + x^4/4! + x^6/6! + ...
   *
   * cosh(0)         = 1
   * cosh(-0)        = 1
   * cosh(Infinity)  = Infinity
   * cosh(-Infinity) = Infinity
   * cosh(NaN)       = NaN
   *
   *  x        time taken (ms)   result
   * 1000      9                 9.8503555700852349694e+433
   * 10000     25                4.4034091128314607936e+4342
   * 100000    171               1.4033316802130615897e+43429
   * 1000000   3817              1.5166076984010437725e+434294
   * 10000000  abandoned after 2 minute wait
   *
   * TODO? Compare performance of cosh(x) = 0.5 * (exp(x) + exp(-x))
   *
   */O.hyperbolicCosine=O.cosh=function(){var t,e,n,i,r,o=this,s=o.constructor,a=new s(1);if(!o.isFinite())return new s(o.s?1/0:NaN);if(o.isZero())return a;n=s.precision,i=s.rounding,s.precision=n+Math.max(o.e,o.sd())+4,s.rounding=1,(r=o.d.length)<32?e=(1/$(4,t=Math.ceil(r/3))).toString():(t=16,e="2.3283064365386962890625e-10"),o=Z(s,1,o.times(e),new s(1),!0);for(// Reverse argument reduction
var c,u=t,h=new s(8);u--;)c=o.times(o),o=a.minus(c.times(h.minus(c.times(h))));return T(o,s.precision=n,s.rounding=i,!0)},/*
   * Return a new Decimal whose value is the hyperbolic sine of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * sinh(x) = x + x^3/3! + x^5/5! + x^7/7! + ...
   *
   * sinh(0)         = 0
   * sinh(-0)        = -0
   * sinh(Infinity)  = Infinity
   * sinh(-Infinity) = -Infinity
   * sinh(NaN)       = NaN
   *
   * x        time taken (ms)
   * 10       2 ms
   * 100      5 ms
   * 1000     14 ms
   * 10000    82 ms
   * 100000   886 ms            1.4033316802130615897e+43429
   * 200000   2613 ms
   * 300000   5407 ms
   * 400000   8824 ms
   * 500000   13026 ms          8.7080643612718084129e+217146
   * 1000000  48543 ms
   *
   * TODO? Compare performance of sinh(x) = 0.5 * (exp(x) - exp(-x))
   *
   */O.hyperbolicSine=O.sinh=function(){var t,e,n,i,r=this,o=r.constructor;if(!r.isFinite()||r.isZero())return new o(r);if(e=o.precision,n=o.rounding,o.precision=e+Math.max(r.e,r.sd())+4,o.rounding=1,(i=r.d.length)<3)r=Z(o,2,r,r,!0);else{t=// Alternative argument reduction: sinh(3x) = sinh(x)(3 + 4sinh^2(x))
// i.e. sinh(x) = sinh(x/3)(3 + 4sinh^2(x/3))
// 3 multiplications and 1 addition
// Argument reduction: sinh(5x) = sinh(x)(5 + sinh^2(x)(20 + 16sinh^2(x)))
// i.e. sinh(x) = sinh(x/5)(5 + sinh^2(x/5)(20 + 16sinh^2(x/5)))
// 4 multiplications and 2 additions
// Estimate the optimum number of times to use the argument reduction.
(t=1.4*Math.sqrt(i))>16?16:0|t,r=Z(o,2,r=r.times(1/$(5,t)),r,!0);for(// Reverse argument reduction
var s,a=new o(5),c=new o(16),u=new o(20);t--;)s=r.times(r),r=r.times(a.plus(s.times(c.times(s).plus(u))))}return o.precision=e,o.rounding=n,T(r,e,n,!0)},/*
   * Return a new Decimal whose value is the hyperbolic tangent of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * tanh(x) = sinh(x) / cosh(x)
   *
   * tanh(0)         = 0
   * tanh(-0)        = -0
   * tanh(Infinity)  = 1
   * tanh(-Infinity) = -1
   * tanh(NaN)       = NaN
   *
   */O.hyperbolicTangent=O.tanh=function(){var t,e,n=this.constructor;return this.isFinite()?this.isZero()?new n(this):(t=n.precision,e=n.rounding,n.precision=t+7,n.rounding=1,R(this.sinh(),this.cosh(),n.precision=t,n.rounding=e)):new n(this.s)},/*
   * Return a new Decimal whose value is the arccosine (inverse cosine) in radians of the value of
   * this Decimal.
   *
   * Domain: [-1, 1]
   * Range: [0, pi]
   *
   * acos(x) = pi/2 - asin(x)
   *
   * acos(0)       = pi/2
   * acos(-0)      = pi/2
   * acos(1)       = 0
   * acos(-1)      = pi
   * acos(1/2)     = pi/3
   * acos(-1/2)    = 2*pi/3
   * acos(|x| > 1) = NaN
   * acos(NaN)     = NaN
   *
   */O.inverseCosine=O.acos=function(){var t,e=this,n=e.constructor,i=e.abs().cmp(1),r=n.precision,o=n.rounding;return -1!==i?0===i?e.isNeg()?P(n,r,o):new n(0):new n(NaN):e.isZero()?P(n,r+4,o).times(.5):(// TODO? Special case acos(0.5) = pi/3 and acos(-0.5) = 2*pi/3
n.precision=r+6,n.rounding=1,e=e.asin(),t=P(n,r+4,o).times(.5),n.precision=r,n.rounding=o,t.minus(e))},/*
   * Return a new Decimal whose value is the inverse of the hyperbolic cosine in radians of the
   * value of this Decimal.
   *
   * Domain: [1, Infinity]
   * Range: [0, Infinity]
   *
   * acosh(x) = ln(x + sqrt(x^2 - 1))
   *
   * acosh(x < 1)     = NaN
   * acosh(NaN)       = NaN
   * acosh(Infinity)  = Infinity
   * acosh(-Infinity) = NaN
   * acosh(0)         = NaN
   * acosh(-0)        = NaN
   * acosh(1)         = 0
   * acosh(-1)        = NaN
   *
   */O.inverseHyperbolicCosine=O.acosh=function(){var t,e,n=this,i=n.constructor;return n.lte(1)?new i(n.eq(1)?0:NaN):n.isFinite()?(t=i.precision,e=i.rounding,i.precision=t+Math.max(Math.abs(n.e),n.sd())+4,i.rounding=1,h=!1,n=n.times(n).minus(1).sqrt().plus(n),h=!0,i.precision=t,i.rounding=e,n.ln()):new i(n)},/*
   * Return a new Decimal whose value is the inverse of the hyperbolic sine in radians of the value
   * of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * asinh(x) = ln(x + sqrt(x^2 + 1))
   *
   * asinh(NaN)       = NaN
   * asinh(Infinity)  = Infinity
   * asinh(-Infinity) = -Infinity
   * asinh(0)         = 0
   * asinh(-0)        = -0
   *
   */O.inverseHyperbolicSine=O.asinh=function(){var t,e,n=this,i=n.constructor;return!n.isFinite()||n.isZero()?new i(n):(t=i.precision,e=i.rounding,i.precision=t+2*Math.max(Math.abs(n.e),n.sd())+6,i.rounding=1,h=!1,n=n.times(n).plus(1).sqrt().plus(n),h=!0,i.precision=t,i.rounding=e,n.ln())},/*
   * Return a new Decimal whose value is the inverse of the hyperbolic tangent in radians of the
   * value of this Decimal.
   *
   * Domain: [-1, 1]
   * Range: [-Infinity, Infinity]
   *
   * atanh(x) = 0.5 * ln((1 + x) / (1 - x))
   *
   * atanh(|x| > 1)   = NaN
   * atanh(NaN)       = NaN
   * atanh(Infinity)  = NaN
   * atanh(-Infinity) = NaN
   * atanh(0)         = 0
   * atanh(-0)        = -0
   * atanh(1)         = Infinity
   * atanh(-1)        = -Infinity
   *
   */O.inverseHyperbolicTangent=O.atanh=function(){var t,e,n,i,r=this,o=r.constructor;return r.isFinite()?r.e>=0?new o(r.abs().eq(1)?r.s/0:r.isZero()?r:NaN):(t=o.precision,e=o.rounding,Math.max(i=r.sd(),t)<-(2*r.e)-1)?T(new o(r),t,e,!0):(o.precision=n=i-r.e,r=R(r.plus(1),new o(1).minus(r),n+t,1),o.precision=t+4,o.rounding=1,r=r.ln(),o.precision=t,o.rounding=e,r.times(.5)):new o(NaN)},/*
   * Return a new Decimal whose value is the arcsine (inverse sine) in radians of the value of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi/2, pi/2]
   *
   * asin(x) = 2*atan(x/(1 + sqrt(1 - x^2)))
   *
   * asin(0)       = 0
   * asin(-0)      = -0
   * asin(1/2)     = pi/6
   * asin(-1/2)    = -pi/6
   * asin(1)       = pi/2
   * asin(-1)      = -pi/2
   * asin(|x| > 1) = NaN
   * asin(NaN)     = NaN
   *
   * TODO? Compare performance of Taylor series.
   *
   */O.inverseSine=O.asin=function(){var t,e,n,i,r=this,o=r.constructor;return r.isZero()?new o(r):(e=r.abs().cmp(1),n=o.precision,i=o.rounding,-1!==e)?// |x| is 1
0===e?((t=P(o,n+4,i).times(.5)).s=r.s,t):new o(NaN):(// TODO? Special case asin(1/2) = pi/6 and asin(-1/2) = -pi/6
o.precision=n+6,o.rounding=1,r=r.div(new o(1).minus(r.times(r)).sqrt().plus(1)).atan(),o.precision=n,o.rounding=i,r.times(2))},/*
   * Return a new Decimal whose value is the arctangent (inverse tangent) in radians of the value
   * of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi/2, pi/2]
   *
   * atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
   *
   * atan(0)         = 0
   * atan(-0)        = -0
   * atan(1)         = pi/4
   * atan(-1)        = -pi/4
   * atan(Infinity)  = pi/2
   * atan(-Infinity) = -pi/2
   * atan(NaN)       = NaN
   *
   */O.inverseTangent=O.atan=function(){var t,e,n,i,r,o,s,a,c,u=this,l=u.constructor,d=l.precision,f=l.rounding;if(u.isFinite()){if(u.isZero())return new l(u);if(u.abs().eq(1)&&d+4<=E)return(s=P(l,d+4,f).times(.25)).s=u.s,s}else{if(!u.s)return new l(NaN);if(d+4<=E)return(s=P(l,d+4,f).times(.5)).s=u.s,s}for(l.precision=a=d+10,l.rounding=1,t=// TODO? if (x >= 1 && pr <= PI_PRECISION) atan(x) = halfPi * x.s - atan(1 / x);
// Argument reduction
// Ensure |x| < 0.42
// atan(x) = 2 * atan(x / (1 + sqrt(1 + x^2)))
n=Math.min(28,a/7+2|0);t;--t)u=u.div(u.times(u).plus(1).sqrt().plus(1));// atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
for(h=!1,e=Math.ceil(a/7),i=1,c=u.times(u),s=new l(u),r=u;-1!==t;)if(r=r.times(c),o=s.minus(r.div(i+=2)),r=r.times(c),void 0!==(s=o.plus(r.div(i+=2))).d[e])for(t=e;s.d[t]===o.d[t]&&t--;);return n&&(s=s.times(2<<n-1)),h=!0,T(s,l.precision=d,l.rounding=f,!0)},/*
   * Return true if the value of this Decimal is a finite number, otherwise return false.
   *
   */O.isFinite=function(){return!!this.d},/*
   * Return true if the value of this Decimal is an integer, otherwise return false.
   *
   */O.isInteger=O.isInt=function(){return!!this.d&&y(this.e/7)>this.d.length-2},/*
   * Return true if the value of this Decimal is NaN, otherwise return false.
   *
   */O.isNaN=function(){return!this.s},/*
   * Return true if the value of this Decimal is negative, otherwise return false.
   *
   */O.isNegative=O.isNeg=function(){return this.s<0},/*
   * Return true if the value of this Decimal is positive, otherwise return false.
   *
   */O.isPositive=O.isPos=function(){return this.s>0},/*
   * Return true if the value of this Decimal is 0 or -0, otherwise return false.
   *
   */O.isZero=function(){return!!this.d&&0===this.d[0]},/*
   * Return true if the value of this Decimal is less than `y`, otherwise return false.
   *
   */O.lessThan=O.lt=function(t){return 0>this.cmp(t)},/*
   * Return true if the value of this Decimal is less than or equal to `y`, otherwise return false.
   *
   */O.lessThanOrEqualTo=O.lte=function(t){return 1>this.cmp(t)},/*
   * Return the logarithm of the value of this Decimal to the specified base, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * If no base is specified, return log[10](arg).
   *
   * log[base](arg) = ln(arg) / ln(base)
   *
   * The result will always be correctly rounded if the base of the log is 10, and 'almost always'
   * otherwise:
   *
   * Depending on the rounding mode, the result may be incorrectly rounded if the first fifteen
   * rounding digits are [49]99999999999999 or [50]00000000000000. In that case, the maximum error
   * between the result and the correctly rounded result will be one ulp (unit in the last place).
   *
   * log[-b](a)       = NaN
   * log[0](a)        = NaN
   * log[1](a)        = NaN
   * log[NaN](a)      = NaN
   * log[Infinity](a) = NaN
   * log[b](0)        = -Infinity
   * log[b](-0)       = -Infinity
   * log[b](-a)       = NaN
   * log[b](1)        = 0
   * log[b](Infinity) = Infinity
   * log[b](NaN)      = NaN
   *
   * [base] {number|string|Decimal} The base of the logarithm.
   *
   */O.logarithm=O.log=function(t){var e,n,i,r,o,s,a,c=this.constructor,u=c.precision,l=c.rounding;// Default base is 10.
if(null==t)t=new c(10),e=!0;else{// Return NaN if base is negative, or non-finite, or is 0 or 1.
if(n=(t=new c(t)).d,t.s<0||!n||!n[0]||t.eq(1))return new c(NaN);e=t.eq(10)}// Is arg negative, non-finite, 0 or 1?
if(n=this.d,this.s<0||!n||!n[0]||this.eq(1))return new c(n&&!n[0]?-1/0:1!=this.s?NaN:n?0:1/0);// The result will have a non-terminating decimal expansion if base is 10 and arg is not an
// integer power of 10.
if(e){if(n.length>1)r=!0;else{for(i=n[0];i%10==0;)i/=10;r=1!==i}}// If at a rounding boundary, i.e. the result's rounding digits are [49]9999 or [50]0000,
// calculate 10 further digits.
//
// If the result is known to have an infinite decimal expansion, repeat this until it is clear
// that the result is above or below the boundary. Otherwise, if after calculating the 10
// further digits, the last 14 are nines, round up and assume the result is exact.
// Also assume the result is exact if the last 14 are zero.
//
// Example of a result that will be incorrectly rounded:
// log[1048576](4503599627370502) = 2.60000000000000009610279511444746...
// The above result correctly rounded using ROUND_CEIL to 1 decimal place should be 2.7, but it
// will be given as 2.6 as there are 15 zeros immediately after the requested decimal place, so
// the exact result would be assumed to be 2.6, which rounded using ROUND_CEIL to 1 decimal
// place is still 2.6.
if(h=!1,M(// The result will have 5 rounding digits.
(a=R(q(this,s=u+5),e?k(c,s+10):q(t,s),s,1)).d,i=u,l))do if(s+=10,a=R(q(this,s),e?k(c,s+10):q(t,s),s,1),!r){// Check for 14 nines from the 2nd rounding digit, as the first may be 4.
+N(a.d).slice(i+1,i+15)+1==1e14&&(a=T(a,u+1,0));break}while(M(a.d,i+=10,l))return h=!0,T(a,u,l)},/*
   * Return a new Decimal whose value is the maximum of the arguments and the value of this Decimal.
   *
   * arguments {number|string|Decimal}
   *
  P.max = function () {
    Array.prototype.push.call(arguments, this);
    return maxOrMin(this.constructor, arguments, 'lt');
  };
   *//*
   * Return a new Decimal whose value is the minimum of the arguments and the value of this Decimal.
   *
   * arguments {number|string|Decimal}
   *
  P.min = function () {
    Array.prototype.push.call(arguments, this);
    return maxOrMin(this.constructor, arguments, 'gt');
  };
   *//*
   *  n - 0 = n
   *  n - N = N
   *  n - I = -I
   *  0 - n = -n
   *  0 - 0 = 0
   *  0 - N = N
   *  0 - I = -I
   *  N - n = N
   *  N - 0 = N
   *  N - N = N
   *  N - I = N
   *  I - n = I
   *  I - 0 = I
   *  I - N = N
   *  I - I = N
   *
   * Return a new Decimal whose value is the value of this Decimal minus `y`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */O.minus=O.sub=function(t){var e,n,i,r,o,s,a,c,u,l,d,f,p=this.constructor;// If either is not finite...
if(t=new p(t),!this.d||!t.d)return this.s&&t.s?this.d?t.s=-t.s:t=new p(t.d||this.s!==t.s?this:NaN):t=new p(NaN),t;// If signs differ...
if(this.s!=t.s)return t.s=-t.s,this.plus(t);// If either is zero...
if(u=this.d,f=t.d,a=p.precision,c=p.rounding,!u[0]||!f[0]){// Return y negated if x is zero and y is non-zero.
if(f[0])t.s=-t.s;else{if(!u[0])return new p(3===c?-0:0);t=new p(this)}return h?T(t,a,c):t}// If base 1e7 exponents differ...
if(// x and y are finite, non-zero numbers with the same sign.
// Calculate base 1e7 exponents.
n=y(t.e/7),l=y(this.e/7),u=u.slice(),o=l-n){for((d=o<0)?(e=u,o=-o,s=f.length):(e=f,n=l,s=u.length),o>// Numbers with massively different exponents would result in a very high number of
// zeros needing to be prepended, but this can be avoided while still ensuring correct
// rounding by limiting the number of zeros to `Math.ceil(pr / LOG_BASE) + 2`.
(i=Math.max(Math.ceil(a/7),s)+2)&&(o=i,e.length=1),// Prepend zeros to equalise exponents.
e.reverse(),i=o;i--;)e.push(0);e.reverse();// Base 1e7 exponents equal.
}else{for((d=// Check digits to determine which is the bigger number.
(i=u.length)<(s=f.length))&&(s=i),i=0;i<s;i++)if(u[i]!=f[i]){d=u[i]<f[i];break}o=0}// Append zeros to `xd` if shorter.
// Don't add zeros to `yd` if shorter as subtraction only needs to start at `yd` length.
for(d&&(e=u,u=f,f=e,t.s=-t.s),s=u.length,i=f.length-s;i>0;--i)u[s++]=0;// Subtract yd from xd.
for(i=f.length;i>o;){if(u[--i]<f[i]){for(r=i;r&&0===u[--r];)u[r]=1e7-1;--u[r],u[i]+=1e7}u[i]-=f[i]}// Remove trailing zeros.
for(;0===u[--s];)u.pop();// Remove leading zeros and adjust exponent accordingly.
for(;0===u[0];u.shift())--n;return(// Zero?
u[0]?(t.d=u,t.e=L(u,n),h?T(t,a,c):t):new p(3===c?-0:0))},/*
   *   n % 0 =  N
   *   n % N =  N
   *   n % I =  n
   *   0 % n =  0
   *  -0 % n = -0
   *   0 % 0 =  N
   *   0 % N =  N
   *   0 % I =  0
   *   N % n =  N
   *   N % 0 =  N
   *   N % N =  N
   *   N % I =  N
   *   I % n =  N
   *   I % 0 =  N
   *   I % N =  N
   *   I % I =  N
   *
   * Return a new Decimal whose value is the value of this Decimal modulo `y`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * The result depends on the modulo mode.
   *
   */O.modulo=O.mod=function(t){var e,n=this.constructor;return(// Return NaN if x is ±Infinity or NaN, or y is NaN or ±0.
(t=new n(t),this.d&&t.s&&(!t.d||t.d[0]))?t.d&&(!this.d||this.d[0])?(// Prevent rounding of intermediate calculations.
h=!1,9==n.modulo?(// Euclidian division: q = sign(y) * floor(x / abs(y))
// result = x - q * y    where  0 <= result < abs(y)
e=R(this,t.abs(),0,3,1),e.s*=t.s):e=R(this,t,0,n.modulo,1),e=e.times(t),h=!0,this.minus(e)):T(new n(this),n.precision,n.rounding):new n(NaN))},/*
   * Return a new Decimal whose value is the natural exponential of the value of this Decimal,
   * i.e. the base e raised to the power the value of this Decimal, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */O.naturalExponential=O.exp=function(){return V(this)},/*
   * Return a new Decimal whose value is the natural logarithm of the value of this Decimal,
   * rounded to `precision` significant digits using rounding mode `rounding`.
   *
   */O.naturalLogarithm=O.ln=function(){return q(this)},/*
   * Return a new Decimal whose value is the value of this Decimal negated, i.e. as if multiplied by
   * -1.
   *
   */O.negated=O.neg=function(){var t=new this.constructor(this);return t.s=-t.s,T(t)},/*
   *  n + 0 = n
   *  n + N = N
   *  n + I = I
   *  0 + n = n
   *  0 + 0 = 0
   *  0 + N = N
   *  0 + I = I
   *  N + n = N
   *  N + 0 = N
   *  N + N = N
   *  N + I = N
   *  I + n = I
   *  I + 0 = I
   *  I + N = N
   *  I + I = I
   *
   * Return a new Decimal whose value is the value of this Decimal plus `y`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */O.plus=O.add=function(t){var e,n,i,r,o,s,a,c,u,l,d=this.constructor;// If either is not finite...
if(t=new d(t),!this.d||!t.d)return this.s&&t.s?this.d||(t=new d(t.d||this.s===t.s?this:NaN)):t=new d(NaN),t;// If signs differ...
if(this.s!=t.s)return t.s=-t.s,this.minus(t);// If either is zero...
if(u=this.d,l=t.d,a=d.precision,c=d.rounding,!u[0]||!l[0])return l[0]||(t=new d(this)),h?T(t,a,c):t;// If base 1e7 exponents differ...
if(// x and y are finite, non-zero numbers with the same sign.
// Calculate base 1e7 exponents.
o=y(this.e/7),i=y(t.e/7),u=u.slice(),r=o-i){for(r<0?(n=u,r=-r,s=l.length):(n=l,i=o,s=u.length),r>(s=// Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
(o=Math.ceil(a/7))>s?o+1:s+1)&&(r=s,n.length=1),// Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
n.reverse();r--;)n.push(0);n.reverse()}// Only start adding at yd.length - 1 as the further digits of xd can be left as they are.
for((s=u.length)-(r=l.length)<0&&(r=s,n=l,l=u,u=n),e=0;r;)e=(u[--r]=u[r]+l[r]+e)/1e7|0,u[r]%=1e7;// Remove trailing zeros.
// No need to check for zero, as +x + +y != 0 && -x + -y != 0
for(e&&(u.unshift(e),++i),s=u.length;0==u[--s];)u.pop();return t.d=u,t.e=L(u,i),h?T(t,a,c):t},/*
   * Return the number of significant digits of the value of this Decimal.
   *
   * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
   *
   */O.precision=O.sd=function(t){var e;if(void 0!==t&&!!t!==t&&1!==t&&0!==t)throw Error(d+t);return this.d?(e=C(this.d),t&&this.e+1>e&&(e=this.e+1)):e=NaN,e},/*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number using
   * rounding mode `rounding`.
   *
   */O.round=function(){var t=this.constructor;return T(new t(this),this.e+1,t.rounding)},/*
   * Return a new Decimal whose value is the sine of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * sin(x) = x - x^3/3! + x^5/5! - ...
   *
   * sin(0)         = 0
   * sin(-0)        = -0
   * sin(Infinity)  = NaN
   * sin(-Infinity) = NaN
   * sin(NaN)       = NaN
   *
   */O.sine=O.sin=function(){var t,e,n=this,i=n.constructor;return n.isFinite()?n.isZero()?new i(n):(t=i.precision,e=i.rounding,i.precision=t+Math.max(n.e,n.sd())+7,i.rounding=1,n=/*
   * sin(x) = x - x^3/3! + x^5/5! - ...
   * |x| < pi/2
   *
   */function(t,e){var n,i=e.d.length;if(i<3)return e.isZero()?e:Z(t,2,e,e);n=// Argument reduction: sin(5x) = 16*sin^5(x) - 20*sin^3(x) + 5*sin(x)
// i.e. sin(x) = 16*sin^5(x/5) - 20*sin^3(x/5) + 5*sin(x/5)
// and  sin(x) = sin(x/5)(5 + sin^2(x/5)(16sin^2(x/5) - 20))
// Estimate the optimum number of times to use the argument reduction.
(n=1.4*Math.sqrt(i))>16?16:0|n,e=Z(t,2,e=e.times(1/$(5,n)),e);for(// Reverse argument reduction
var r,o=new t(5),s=new t(16),a=new t(20);n--;)r=e.times(e),e=e.times(o.plus(r.times(s.times(r).minus(a))));return e}(i,z(i,n)),i.precision=t,i.rounding=e,T(r>2?n.neg():n,t,e,!0)):new i(NaN)},/*
   * Return a new Decimal whose value is the square root of this Decimal, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   *  sqrt(-n) =  N
   *  sqrt(N)  =  N
   *  sqrt(-I) =  N
   *  sqrt(I)  =  I
   *  sqrt(0)  =  0
   *  sqrt(-0) = -0
   *
   */O.squareRoot=O.sqrt=function(){var t,e,n,i,r,o,s=this.d,a=this.e,c=this.s,u=this.constructor;// Negative/NaN/Infinity/zero?
if(1!==c||!s||!s[0])return new u(!c||c<0&&(!s||s[0])?NaN:s?this:1/0);// Newton-Raphson iteration.
for(h=!1,0==// Initial estimate.
(c=Math.sqrt(+this))||c==1/0?(((e=N(s)).length+a)%2==0&&(e+="0"),c=Math.sqrt(e),a=y((a+1)/2)-(a<0||a%2),i=new u(e=c==1/0?"5e"+a:(e=c.toExponential()).slice(0,e.indexOf("e")+1)+a)):i=new u(c.toString()),n=(a=u.precision)+3;;)// TODO? Replace with for-loop and checkRoundingDigits.
if(i=(o=i).plus(R(this,o,n+2,1)).times(.5),N(o.d).slice(0,n)===(e=N(i.d)).slice(0,n)){// The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
// 4999, i.e. approaching a rounding boundary, continue the iteration.
if("9999"!=(e=e.slice(n-3,n+1))&&(r||"4999"!=e)){// If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
// If not, then there are further digits and m will be truthy.
+e&&(+e.slice(1)||"5"!=e.charAt(0))||(// Truncate to the first rounding digit.
T(i,a+1,1),t=!i.times(i).eq(this));break}// On the first iteration only, check to see if rounding up gives the exact result as the
// nines may infinitely repeat.
if(!r&&(T(o,a+1,0),o.times(o).eq(this))){i=o;break}n+=4,r=1}return h=!0,T(i,a,u.rounding,t)},/*
   * Return a new Decimal whose value is the tangent of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * tan(0)         = 0
   * tan(-0)        = -0
   * tan(Infinity)  = NaN
   * tan(-Infinity) = NaN
   * tan(NaN)       = NaN
   *
   */O.tangent=O.tan=function(){var t,e,n=this,i=n.constructor;return n.isFinite()?n.isZero()?new i(n):(t=i.precision,e=i.rounding,i.precision=t+10,i.rounding=1,(n=n.sin()).s=1,n=R(n,new i(1).minus(n.times(n)).sqrt(),t+10,0),i.precision=t,i.rounding=e,T(2==r||4==r?n.neg():n,t,e,!0)):new i(NaN)},/*
   *  n * 0 = 0
   *  n * N = N
   *  n * I = I
   *  0 * n = 0
   *  0 * 0 = 0
   *  0 * N = N
   *  0 * I = N
   *  N * n = N
   *  N * 0 = N
   *  N * N = N
   *  N * I = N
   *  I * n = I
   *  I * 0 = N
   *  I * N = N
   *  I * I = I
   *
   * Return a new Decimal whose value is this Decimal times `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   */O.times=O.mul=function(t){var e,n,i,r,o,s,a,c,u,l=this.constructor,d=this.d,f=(t=new l(t)).d;// If either is NaN, ±Infinity or ±0...
if(t.s*=this.s,!d||!d[0]||!f||!f[0])return new l(t.s&&(!d||d[0]||f)&&(!f||f[0]||d)?d&&f?0*t.s:t.s/0:NaN);for(n=y(this.e/7)+y(t.e/7),(c=d.length)<(u=f.length)&&(o=d,d=f,f=o,s=c,c=u,u=s),// Initialise the result array with zeros.
o=[],i=s=c+u;i--;)o.push(0);// Multiply!
for(i=u;--i>=0;){for(e=0,r=c+i;r>i;)a=o[r]+f[i]*d[r-i-1]+e,o[r--]=a%1e7|0,e=a/1e7|0;o[r]=(o[r]+e)%1e7|0}// Remove trailing zeros.
for(;!o[--s];)o.pop();return e?++n:o.shift(),t.d=o,t.e=L(o,n),h?T(t,l.precision,l.rounding):t},/*
   * Return a string representing the value of this Decimal in base 2, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */O.toBinary=function(t,e){return H(this,2,t,e)},/*
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `dp`
   * decimal places using rounding mode `rm` or `rounding` if `rm` is omitted.
   *
   * If `dp` is omitted, return a new Decimal whose value is the value of this Decimal.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */O.toDecimalPlaces=O.toDP=function(t,e){var n=this,i=n.constructor;return(n=new i(n),void 0===t)?n:(_(t,0,1e9),void 0===e?e=i.rounding:_(e,0,8),T(n,t+n.e+1,e))},/*
   * Return a string representing the value of this Decimal in exponential notation rounded to
   * `dp` fixed decimal places using rounding mode `rounding`.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */O.toExponential=function(t,e){var n,i=this,r=i.constructor;return void 0===t?n=D(i,!0):(_(t,0,1e9),void 0===e?e=r.rounding:_(e,0,8),n=D(i=T(new r(i),t+1,e),!0,t+1)),i.isNeg()&&!i.isZero()?"-"+n:n},/*
   * Return a string representing the value of this Decimal in normal (fixed-point) notation to
   * `dp` fixed decimal places and rounded using rounding mode `rm` or `rounding` if `rm` is
   * omitted.
   *
   * As with JavaScript numbers, (-0).toFixed(0) is '0', but e.g. (-0.00001).toFixed(0) is '-0'.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
   * (-0).toFixed(3) is '0.000'.
   * (-0.5).toFixed(0) is '-0'.
   *
   */O.toFixed=function(t,e){var n,i,r=this.constructor;// To determine whether to add the minus sign look at the value before it was rounded,
// i.e. look at `x` rather than `y`.
return void 0===t?n=D(this):(_(t,0,1e9),void 0===e?e=r.rounding:_(e,0,8),n=D(i=T(new r(this),t+this.e+1,e),!1,t+i.e+1)),this.isNeg()&&!this.isZero()?"-"+n:n},/*
   * Return an array representing the value of this Decimal as a simple fraction with an integer
   * numerator and an integer denominator.
   *
   * The denominator will be a positive non-zero value less than or equal to the specified maximum
   * denominator. If a maximum denominator is not specified, the denominator will be the lowest
   * value necessary to represent the number exactly.
   *
   * [maxD] {number|string|Decimal} Maximum denominator. Integer >= 1 and < Infinity.
   *
   */O.toFraction=function(t){var e,n,i,r,o,s,a,c,u,l,f,p,v=this.d,y=this.constructor;if(!v)return new y(this);if(u=n=new y(1),i=c=new y(0),s=(o=(e=new y(i)).e=C(v)-this.e-1)%7,e.d[0]=g(10,s<0?7+s:s),null==t)t=o>0?e:u;else{if(!(a=new y(t)).isInt()||a.lt(u))throw Error(d+a);t=a.gt(e)?o>0?e:u:a}for(h=!1,a=new y(N(v)),l=y.precision,y.precision=o=14*v.length;f=R(a,e,0,1,1),1!=(r=n.plus(f.times(i))).cmp(t);)n=i,i=r,r=u,u=c.plus(f.times(r)),c=r,r=e,e=a.minus(f.times(r)),a=r;return r=R(t.minus(n),i,0,1,1),c=c.plus(r.times(u)),n=n.plus(r.times(i)),c.s=u.s=this.s,// Determine which fraction is closer to x, n0/d0 or n1/d1?
p=1>R(u,i,o,1).minus(this).abs().cmp(R(c,n,o,1).minus(this).abs())?[u,i]:[c,n],y.precision=l,h=!0,p},/*
   * Return a string representing the value of this Decimal in base 16, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */O.toHexadecimal=O.toHex=function(t,e){return H(this,16,t,e)},/*
   * Returns a new Decimal whose value is the nearest multiple of `y` in the direction of rounding
   * mode `rm`, or `Decimal.rounding` if `rm` is omitted, to the value of this Decimal.
   *
   * The return value will always have the same sign as this Decimal, unless either this Decimal
   * or `y` is NaN, in which case the return value will be also be NaN.
   *
   * The return value is not affected by the value of `precision`.
   *
   * y {number|string|Decimal} The magnitude to round to a multiple of.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * 'toNearest() rounding mode not an integer: {rm}'
   * 'toNearest() rounding mode out of range: {rm}'
   *
   */O.toNearest=function(t,e){var n=this,i=n.constructor;if(n=new i(n),null==t){// If x is not finite, return x.
if(!n.d)return n;t=new i(1),e=i.rounding}else{// If x is not finite, return x if y is not NaN, else NaN.
if(t=new i(t),void 0===e?e=i.rounding:_(e,0,8),!n.d)return t.s?n:t;// If y is not finite, return Infinity with the sign of x if y is Infinity, else NaN.
if(!t.d)return t.s&&(t.s=n.s),t}return t.d[0]?(h=!1,n=R(n,t,0,e,1).times(t),h=!0,T(n)):(t.s=n.s,n=t),n},/*
   * Return the value of this Decimal converted to a number primitive.
   * Zero keeps its sign.
   *
   */O.toNumber=function(){return+this},/*
   * Return a string representing the value of this Decimal in base 8, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */O.toOctal=function(t,e){return H(this,8,t,e)},/*
   * Return a new Decimal whose value is the value of this Decimal raised to the power `y`, rounded
   * to `precision` significant digits using rounding mode `rounding`.
   *
   * ECMAScript compliant.
   *
   *   pow(x, NaN)                           = NaN
   *   pow(x, ±0)                            = 1

   *   pow(NaN, non-zero)                    = NaN
   *   pow(abs(x) > 1, +Infinity)            = +Infinity
   *   pow(abs(x) > 1, -Infinity)            = +0
   *   pow(abs(x) == 1, ±Infinity)           = NaN
   *   pow(abs(x) < 1, +Infinity)            = +0
   *   pow(abs(x) < 1, -Infinity)            = +Infinity
   *   pow(+Infinity, y > 0)                 = +Infinity
   *   pow(+Infinity, y < 0)                 = +0
   *   pow(-Infinity, odd integer > 0)       = -Infinity
   *   pow(-Infinity, even integer > 0)      = +Infinity
   *   pow(-Infinity, odd integer < 0)       = -0
   *   pow(-Infinity, even integer < 0)      = +0
   *   pow(+0, y > 0)                        = +0
   *   pow(+0, y < 0)                        = +Infinity
   *   pow(-0, odd integer > 0)              = -0
   *   pow(-0, even integer > 0)             = +0
   *   pow(-0, odd integer < 0)              = -Infinity
   *   pow(-0, even integer < 0)             = +Infinity
   *   pow(finite x < 0, finite non-integer) = NaN
   *
   * For non-integer or very large exponents pow(x, y) is calculated using
   *
   *   x^y = exp(y*ln(x))
   *
   * Assuming the first 15 rounding digits are each equally likely to be any digit 0-9, the
   * probability of an incorrectly rounded result
   * P([49]9{14} | [50]0{14}) = 2 * 0.2 * 10^-14 = 4e-15 = 1/2.5e+14
   * i.e. 1 in 250,000,000,000,000
   *
   * If a result is incorrectly rounded the maximum error will be 1 ulp (unit in last place).
   *
   * y {number|string|Decimal} The power to which to raise this Decimal.
   *
   */O.toPower=O.pow=function(t){var e,n,i,r,o,s,a=this,c=a.constructor,u=+(t=new c(t));// Either ±Infinity, NaN or ±0?
if(!a.d||!t.d||!a.d[0]||!t.d[0])return new c(g(+a,u));if((a=new c(a)).eq(1))return a;if(i=c.precision,o=c.rounding,t.eq(1))return T(a,i,o);// If y is a small integer use the 'exponentiation by squaring' algorithm.
if(// y exponent
(e=y(t.e/7))>=t.d.length-1&&(n=u<0?-u:u)<=9007199254740991)return r=j(c,a,n,i),t.s<0?new c(1).div(r):T(r,i,o);// if x is negative
if((s=a.s)<0){// if y is not an integer
if(e<t.d.length-1)return new c(NaN);// if x.eq(-1)
if((1&t.d[e])==0&&(s=1),0==a.e&&1==a.d[0]&&1==a.d.length)return a.s=s,a}return(// Exponent estimate may be incorrect e.g. x: 0.999999999999999999, y: 2.29, e: 0, r.e: -1.
// Overflow/underflow?
(e=0!=// Estimate result exponent.
// x^y = 10^e,  where e = y * log10(x)
// log10(x) = log10(x_significand) + x_exponent
// log10(x_significand) = ln(x_significand) / ln(10)
(n=g(+a,u))&&isFinite(n)?new c(n+"").e:y(u*(Math.log("0."+N(a.d))/Math.LN10+a.e+1)))>c.maxE+1||e<c.minE-1?new c(e>0?s/0:0):(h=!1,c.rounding=a.s=1,// Estimate the extra guard digits needed to ensure five correct rounding digits from
// naturalLogarithm(x). Example of failure without these extra digits (precision: 10):
// new Decimal(2.32456).pow('2087987436534566.46411')
// should be 1.162377823e+764914905173815, but is 1.162355823e+764914905173815
n=Math.min(12,(e+"").length),// r = x^y = exp(y*ln(x))
(r=V(t.times(q(a,i+n)),i)).d&&M(// Truncate to the required precision plus five rounding digits.
(r=T(r,i+5,1)).d,i,o)&&(e=i+10,+N(// Truncate to the increased precision plus five rounding digits.
(r=T(V(t.times(q(a,e+n)),e),e+5,1)).d).slice(i+1,i+15)+1==1e14&&(r=T(r,i+1,0))),r.s=s,h=!0,c.rounding=o,T(r,i,o)))},/*
   * Return a string representing the value of this Decimal rounded to `sd` significant digits
   * using rounding mode `rounding`.
   *
   * Return exponential notation if `sd` is less than the number of digits necessary to represent
   * the integer part of the value in normal notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */O.toPrecision=function(t,e){var n,i=this,r=i.constructor;return void 0===t?n=D(i,i.e<=r.toExpNeg||i.e>=r.toExpPos):(_(t,1,1e9),void 0===e?e=r.rounding:_(e,0,8),n=D(i=T(new r(i),t,e),t<=i.e||i.e<=r.toExpNeg,t)),i.isNeg()&&!i.isZero()?"-"+n:n},/*
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `sd`
   * significant digits using rounding mode `rm`, or to `precision` and `rounding` respectively if
   * omitted.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * 'toSD() digits out of range: {sd}'
   * 'toSD() digits not an integer: {sd}'
   * 'toSD() rounding mode not an integer: {rm}'
   * 'toSD() rounding mode out of range: {rm}'
   *
   */O.toSignificantDigits=O.toSD=function(t,e){var n=this.constructor;return void 0===t?(t=n.precision,e=n.rounding):(_(t,1,1e9),void 0===e?e=n.rounding:_(e,0,8)),T(new n(this),t,e)},/*
   * Return a string representing the value of this Decimal.
   *
   * Return exponential notation if this Decimal has a positive exponent equal to or greater than
   * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
   *
   */O.toString=function(){var t=this.constructor,e=D(this,this.e<=t.toExpNeg||this.e>=t.toExpPos);return this.isNeg()&&!this.isZero()?"-"+e:e},/*
   * Return a new Decimal whose value is the value of this Decimal truncated to a whole number.
   *
   */O.truncated=O.trunc=function(){return T(new this.constructor(this),this.e+1,1)},/*
   * Return a string representing the value of this Decimal.
   * Unlike `toString`, negative zero will include the minus sign.
   *
   */O.valueOf=O.toJSON=function(){var t=this.constructor,e=D(this,this.e<=t.toExpNeg||this.e>=t.toExpPos);return this.isNeg()?"-"+e:e};/*
   * Perform division in the specified base.
   */var R=function(){// Assumes non-zero x and k, and hence non-zero result.
function t(t,e,n){var i,r=0,o=t.length;for(t=t.slice();o--;)i=t[o]*e+r,t[o]=i%n|0,r=i/n|0;return r&&t.unshift(r),t}function e(t,e,n,i){var r,o;if(n!=i)o=n>i?1:-1;else for(r=o=0;r<n;r++)if(t[r]!=e[r]){o=t[r]>e[r]?1:-1;break}return o}function i(t,e,n,i){// Subtract b from a.
for(var r=0;n--;)t[n]-=r,r=t[n]<e[n]?1:0,t[n]=r*i+t[n]-e[n];// Remove leading zeros.
for(;!t[0]&&t.length>1;)t.shift()}return function(r,o,s,a,c,u){var h,l,d,f,p,v,g,m,w,b,x,S,E,O,N,_,M,A,R,D,L=r.constructor,k=r.s==o.s?1:-1,P=r.d,C=o.d;// Either NaN, Infinity or 0?
if(!P||!P[0]||!C||!C[0])return new L(r.s&&o.s&&(P?!C||P[0]!=C[0]:C)?P&&0==P[0]||!C?0*k:k/0:NaN);// Result exponent may be one less than e.
// The digit array of a Decimal from toStringBinary may have trailing zeros.
for(u?(p=1,l=r.e-o.e):(u=1e7,p=7,l=y(r.e/p)-y(o.e/p)),R=C.length,M=P.length,b=(w=new L(k)).d=[],d=0;C[d]==(P[d]||0);d++);if(C[d]>(P[d]||0)&&l--,null==s?(O=s=L.precision,a=L.rounding):O=c?s+(r.e-o.e)+1:s,O<0)b.push(1),v=!0;else{// divisor < 1e7
if(// Convert precision in number of base 10 digits to base 1e7 digits.
O=O/p+2|0,d=0,1==R){// k is the carry.
for(f=0,C=C[0],O++;(d<M||f)&&O--;d++)N=f*u+(P[d]||0),b[d]=N/C|0,f=N%C|0;v=f||d<M;// divisor >= 1e7
}else{// Add zeros to make remainder as long as divisor.
for(// Normalise xd and yd so highest order digit of yd is >= base/2
(f=u/(C[0]+1)|0)>1&&(C=t(C,f,u),P=t(P,f,u),R=C.length,M=P.length),_=R,S=(x=P.slice(0,R)).length;S<R;)x[S++]=0;(D=C.slice()).unshift(0),A=C[0],C[1]>=u/2&&++A;do f=0,// Compare divisor and remainder.
(h=e(C,x,R,S))<0?(// Calculate trial digit, k.
E=x[0],R!=S&&(E=E*u+(x[1]||0)),// k will be how many times the divisor goes into the current remainder.
(f=E/A|0)>1?(f>=u&&(f=u-1),m=// product = divisor * trial digit.
(g=t(C,f,u)).length,S=x.length,1==// Compare product and remainder.
(h=e(g,x,m,S))&&(f--,// Subtract divisor from product.
i(g,R<m?D:C,m,u))):(0==f&&(h=f=1),g=C.slice()),(m=g.length)<S&&g.unshift(0),// Subtract product from remainder.
i(x,g,S,u),-1==h&&(S=x.length,// Compare divisor and new remainder.
(h=e(C,x,R,S))<1&&(f++,// Subtract divisor from remainder.
i(x,R<S?D:C,S,u))),S=x.length):0===h&&(f++,x=[0]),// Add the next digit, k, to the result array.
b[d++]=f,h&&x[0]?x[S++]=P[_]||0:(x=[P[_]],S=1);while((_++<M||void 0!==x[0])&&O--)v=void 0!==x[0]}b[0]||b.shift()}// logBase is 1 when divide is being used for base conversion.
if(1==p)w.e=l,n=v;else{// To calculate q.e, first get the number of digits of qd[0].
for(d=1,f=b[0];f>=10;f/=10)d++;w.e=d+l*p-1,T(w,c?s+w.e+1:s,a,v)}return w}}();/*
   * Round `x` to `sd` significant digits using rounding mode `rm`.
   * Check for over/under-flow.
   */function T(t,e,n,i){var r,o,s,a,c,u,l,d,f,p=t.constructor;// Don't round if sd is null or undefined.
t:if(null!=e){// Infinity/NaN.
if(!(d=t.d))return t;// rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
// w: the word of xd containing rd, a base 1e7 number.
// xdi: the index of w within xd.
// digits: the number of digits of w.
// i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
// they had leading zeros)
// j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).
// Get the length of the first word of the digits array xd.
for(r=1,a=d[0];a>=10;a/=10)r++;// Is the rounding digit in the first word of xd?
if((o=e-r)<0)o+=7,s=e,// Get the rounding digit at index j of w.
c=(l=d[f=0])/g(10,r-s-1)%10|0;else if((f=Math.ceil((o+1)/7))>=(a=d.length)){if(i){// Needed by `naturalExponential`, `naturalLogarithm` and `squareRoot`.
for(;a++<=f;)d.push(0);l=c=0,r=1,o%=7,s=o-7+1}else break t}else{// Get the number of digits of w.
for(r=1,l=a=d[f];a>=10;a/=10)r++;// Get the index of rd within w.
o%=7,// Get the rounding digit at index j of w.
c=// Get the index of rd within w, adjusted for leading zeros.
// The number of leading zeros of w is given by LOG_BASE - digits.
(s=o-7+r)<0?0:l/g(10,r-s-1)%10|0}if(// Are there any non-zero digits after the rounding digit?
i=i||e<0||void 0!==d[f+1]||(s<0?l:l%g(10,r-s-1)),// The expression `w % mathpow(10, digits - j - 1)` returns all the digits of w to the right
// of the digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression
// will give 714.
u=n<4?(c||i)&&(0==n||n==(t.s<0?3:2)):c>5||5==c&&(4==n||i||6==n&&(o>0?s>0?l/g(10,r-s):0:d[f-1])%10&1||n==(t.s<0?8:7)),e<1||!d[0])return d.length=0,u?(// Convert sd to decimal places.
e-=t.e+1,// 1, 0.1, 0.01, 0.001, 0.0001 etc.
d[0]=g(10,(7-e%7)%7),t.e=-e||0):d[0]=t.e=0,t;if(0==o?(d.length=f,a=1,f--):(d.length=f+1,a=g(10,7-o),// E.g. 56700 becomes 56000 if 7 is the rounding digit.
// j > 0 means i > number of leading zeros of w.
d[f]=s>0?(l/g(10,r-s)%g(10,s)|0)*a:0),u)for(;;)if(0==f){// i will be the length of xd[0] before k is added.
for(o=1,s=d[0];s>=10;s/=10)o++;for(s=d[0]+=a,a=1;s>=10;s/=10)a++;o!=a&&(t.e++,1e7==d[0]&&(d[0]=1));break}else{if(d[f]+=a,1e7!=d[f])break;d[f--]=0,a=1}// Remove trailing zeros.
for(o=d.length;0===d[--o];)d.pop()}return h&&(t.e>p.maxE?(// Infinity.
t.d=null,t.e=NaN):t.e<p.minE&&(// Zero.
t.e=0,t.d=[0])),t}function D(t,e,n){if(!t.isFinite())return B(t);var i,r=t.e,o=N(t.d),s=o.length;return e?(n&&(i=n-s)>0?o=o.charAt(0)+"."+o.slice(1)+I(i):s>1&&(o=o.charAt(0)+"."+o.slice(1)),o=o+(t.e<0?"e":"e+")+t.e):r<0?(o="0."+I(-r-1)+o,n&&(i=n-s)>0&&(o+=I(i))):r>=s?(o+=I(r+1-s),n&&(i=n-r-1)>0&&(o=o+"."+I(i))):((i=r+1)<s&&(o=o.slice(0,i)+"."+o.slice(i)),n&&(i=n-s)>0&&(r+1===s&&(o+="."),o+=I(i))),o}// Calculate the base 10 exponent from the base 1e7 exponent.
function L(t,e){var n=t[0];// Add the number of digits of the first word of the digits array.
for(e*=7;n>=10;n/=10)e++;return e}function k(t,e,n){if(e>S)throw(// Reset global state in case the exception is caught.
h=!0,n&&(t.precision=n),Error(f));return T(new t(s),e,1,!0)}function P(t,e,n){if(e>E)throw Error(f);return T(new t(a),e,n,!0)}function C(t){var e=t.length-1,n=7*e+1;// If non-zero...
if(e=t[e]){// Subtract the number of trailing zeros of the last word.
for(;e%10==0;e/=10)n--;// Add the number of digits of the first word.
for(e=t[0];e>=10;e/=10)n++}return n}function I(t){for(var e="";t--;)e+="0";return e}/*
   * Return a new Decimal whose value is the value of Decimal `x` to the power `n`, where `n` is an
   * integer of type number.
   *
   * Implements 'exponentiation by squaring'. Called by `pow` and `parseOther`.
   *
   */function j(t,e,n,i){var r,o=new t(1),// Maximum digits array length; leaves [28, 34] guard digits.
s=Math.ceil(i/7+4);for(h=!1;;){if(n%2&&J((o=o.times(e)).d,s)&&(r=!0),0===(n=y(n/2))){// To ensure correct rounding when r.d is truncated, increment the last word if it is zero.
n=o.d.length-1,r&&0===o.d[n]&&++o.d[n];break}J((e=e.times(e)).d,s)}return h=!0,o}function U(t){return 1&t.d[t.d.length-1]}/*
   * Handle `max` and `min`. `ltgt` is 'lt' or 'gt'.
   */function F(t,e,n){for(var i,r=new t(e[0]),o=0;++o<e.length;)if((i=new t(e[o])).s)r[n](i)&&(r=i);else{r=i;break}return r}/*
   * Return a new Decimal whose value is the natural exponential of `x` rounded to `sd` significant
   * digits.
   *
   * Taylor/Maclaurin series.
   *
   * exp(x) = x^0/0! + x^1/1! + x^2/2! + x^3/3! + ...
   *
   * Argument reduction:
   *   Repeat x = x / 32, k += 5, until |x| < 0.1
   *   exp(x) = exp(x / 2^k)^(2^k)
   *
   * Previously, the argument was initially reduced by
   * exp(x) = exp(r) * 10^k  where r = x - k * ln10, k = floor(x / ln10)
   * to first put r in the range [0, ln10], before dividing by 32 until |x| < 0.1, but this was
   * found to be slower than just dividing repeatedly by 32 as above.
   *
   * Max integer argument: exp('20723265836946413') = 6.3e+9000000000000000
   * Min integer argument: exp('-20723265836946411') = 1.2e-9000000000000000
   * (Math object integer min/max: Math.exp(709) = 8.2e+307, Math.exp(-745) = 5e-324)
   *
   *  exp(Infinity)  = Infinity
   *  exp(-Infinity) = 0
   *  exp(NaN)       = NaN
   *  exp(±0)        = 1
   *
   *  exp(x) is non-terminating for any finite, non-zero x.
   *
   *  The result will always be correctly rounded.
   *
   */function V(t,e){var n,i,r,o,s,a,c,u=0,l=0,d=0,f=t.constructor,p=f.rounding,v=f.precision;// 0/NaN/Infinity?
if(!t.d||!t.d[0]||t.e>17)return new f(t.d?t.d[0]?t.s<0?0:1/0:1:t.s?t.s<0?0:t:0/0);// while abs(x) >= 0.1
for(null==e?(h=!1,c=v):c=e,a=new f(.03125);t.e>-2;)// x = x / 2^5
t=t.times(a),d+=5;for(c+=// Use 2 * log10(2^k) + 5 (empirically derived) to estimate the increase in precision
// necessary to ensure the first 4 rounding digits are correct.
i=Math.log(g(2,d))/Math.LN10*2+5|0,n=o=s=new f(1),f.precision=c;;){if(o=T(o.times(t),c,1),n=n.times(++l),N((a=s.plus(R(o,n,c,1))).d).slice(0,c)===N(s.d).slice(0,c)){for(r=d;r--;)s=T(s.times(s),c,1);// Check to see if the first 4 rounding digits are [49]999.
// If so, repeat the summation with a higher precision, otherwise
// e.g. with precision: 18, rounding: 1
// exp(18.404272462595034083567793919843761) = 98372560.1229999999 (should be 98372560.123)
// `wpr - guard` is the index of first rounding digit.
if(null!=e)return f.precision=v,s;if(!(u<3&&M(s.d,c-i,p,u)))return T(s,f.precision=v,p,h=!0);f.precision=c+=10,n=o=a=new f(1),l=0,u++}s=a}}/*
   * Return a new Decimal whose value is the natural logarithm of `x` rounded to `sd` significant
   * digits.
   *
   *  ln(-n)        = NaN
   *  ln(0)         = -Infinity
   *  ln(-0)        = -Infinity
   *  ln(1)         = 0
   *  ln(Infinity)  = Infinity
   *  ln(-Infinity) = NaN
   *  ln(NaN)       = NaN
   *
   *  ln(n) (n != 1) is non-terminating.
   *
   */function q(t,e){var n,i,r,o,s,a,c,u,l,d,f,p=1,v=t,y=v.d,g=v.constructor,m=g.rounding,w=g.precision;// Is x negative or Infinity, NaN, 0 or 1?
if(v.s<0||!y||!y[0]||!v.e&&1==y[0]&&1==y.length)return new g(y&&!y[0]?-1/0:1!=v.s?NaN:y?0:v);if(null==e?(h=!1,l=w):l=e,g.precision=l+=10,i=(n=N(y)).charAt(0),!(15e14>Math.abs(o=v.e)))return(// The argument reduction method above may result in overflow if the argument y is a massive
// number with exponent >= 1500000000000000 (9e15 / 6 = 1.5e15), so instead recall this
// function using ln(x*10^e) = ln(x) + e*ln(10).
u=k(g,l+2,w).times(o+""),v=q(new g(i+"."+n.slice(1)),l-10).plus(u),g.precision=w,null==e?T(v,w,m,h=!0):v);// Argument reduction.
// The series converges faster the closer the argument is to 1, so using
// ln(a^b) = b * ln(a),   ln(a) = ln(a^b) / b
// multiply the argument by itself until the leading digits of the significand are 7, 8, 9,
// 10, 11, 12 or 13, recording the number of multiplications so the sum of the series can
// later be divided by this number, then separate out the power of 10 using
// ln(a*10^b) = ln(a) + b*ln(10).
// max n is 21 (gives 0.9, 1.0 or 1.1) (9e15 / 21 = 4.2e14).
//while (c0 < 9 && c0 != 1 || c0 == 1 && c.charAt(1) > 1) {
// max n is 6 (gives 0.7 - 1.3)
for(;i<7&&1!=i||1==i&&n.charAt(1)>3;)i=(n=N((v=v.times(t)).d)).charAt(0),p++;for(o=v.e,i>1?(v=new g("0."+n),o++):v=new g(i+"."+n.slice(1)),// x1 is x reduced to a value near 1.
d=v,// Taylor series.
// ln(y) = ln((1 + x)/(1 - x)) = 2(x + x^3/3 + x^5/5 + x^7/7 + ...)
// where x = (y - 1)/(y + 1)    (|x| < 1)
c=s=v=R(v.minus(1),v.plus(1),l,1),f=T(v.times(v),l,1),r=3;;){if(s=T(s.times(f),l,1),N((u=c.plus(R(s,new g(r),l,1))).d).slice(0,l)===N(c.d).slice(0,l)){// Is rm > 3 and the first 4 rounding digits 4999, or rm < 4 (or the summation has
// been repeated previously) and the first 4 rounding digits 9999?
// If so, restart the summation with a higher precision, otherwise
// e.g. with precision: 12, rounding: 1
// ln(135520028.6126091714265381533) = 18.7246299999 when it should be 18.72463.
// `wpr - guard` is the index of first rounding digit.
if(c=c.times(2),0!==o&&(c=c.plus(k(g,l+2,w).times(o+""))),c=R(c,new g(p),l,1),null!=e)return g.precision=w,c;if(!M(c.d,l-10,m,a))return T(c,g.precision=w,m,h=!0);g.precision=l+=10,u=s=v=R(d.minus(1),d.plus(1),l,1),f=T(v.times(v),l,1),r=a=1}c=u,r+=2}}// ±Infinity, NaN.
function B(t){// Unsigned.
return String(t.s*t.s/0)}/*
   * Parse the value of a new Decimal `x` from string `str`.
   */function Y(t,e){var n,i,r;// Determine leading zeros.
for((n=e.indexOf("."))>-1&&(e=e.replace(".","")),(i=e.search(/e/i))>0?(n<0&&(n=i),n+=+e.slice(i+1),e=e.substring(0,i)):n<0&&(n=e.length),i=0;48===e.charCodeAt(i);i++);// Determine trailing zeros.
for(r=e.length;48===e.charCodeAt(r-1);--r);if(e=e.slice(i,r)){if(r-=i,t.e=n=n-i-1,t.d=[],// Transform base
// e is the base 10 exponent.
// i is where to slice str to get the first word of the digits array.
i=(n+1)%7,n<0&&(i+=7),i<r){for(i&&t.d.push(+e.slice(0,i)),r-=7;i<r;)t.d.push(+e.slice(i,i+=7));i=7-(e=e.slice(i)).length}else i-=r;for(;i--;)e+="0";t.d.push(+e),h&&(t.e>t.constructor.maxE?(// Infinity.
t.d=null,t.e=NaN):t.e<t.constructor.minE&&(// Zero.
t.e=0,t.d=[0]))}else // Zero.
t.e=0,t.d=[0];return t}// Calculate Taylor series for `cos`, `cosh`, `sin` and `sinh`.
function Z(t,e,n,i,r){var o,s,a,c,u=t.precision,l=Math.ceil(u/7);for(h=!1,c=n.times(n),a=new t(i);;){if(s=R(a.times(c),new t(e++*e++),u,1),a=r?i.plus(s):i.minus(s),i=R(s.times(c),new t(e++*e++),u,1),void 0!==(s=a.plus(i)).d[l]){for(o=l;s.d[o]===a.d[o]&&o--;);if(-1==o)break}o=a,a=i,i=s,s=o}return h=!0,s.d.length=l+1,s}// Exponent e must be positive and non-zero.
function $(t,e){for(var n=t;--e;)n*=t;return n}// Return the absolute value of `x` reduced to less than or equal to half pi.
function z(t,e){var n,i=e.s<0,o=P(t,t.precision,1),s=o.times(.5);if((e=e.abs()).lte(s))return r=i?4:1,e;if((n=e.divToInt(o)).isZero())r=i?3:2;else{// 0 <= x < pi
if((e=e.minus(n.times(o))).lte(s))return r=U(n)?i?2:3:i?4:1,e;r=U(n)?i?1:4:i?3:2}return e.minus(o).abs()}/*
   * Return the value of Decimal `x` as a string in base `baseOut`.
   *
   * If the optional `sd` argument is present include a binary exponent suffix.
   */function H(t,e,i,r){var s,a,c,u,h,l,d,f,p,v=t.constructor,y=void 0!==i;if(y?(_(i,1,1e9),void 0===r?r=v.rounding:_(r,0,8)):(i=v.precision,r=v.rounding),t.isFinite()){// Remove trailing zeros.
for(c=(d=D(t)).indexOf("."),y?(s=2,16==e?i=4*i-3:8==e&&(i=3*i-2)):s=e,c>=0&&(d=d.replace(".",""),(p=new v(1)).e=d.length-c,p.d=A(D(p),10,s),p.e=p.d.length),a=h=(f=A(d,10,s)).length;0==f[--h];)f.pop();if(f[0]){if(c<0?a--:((t=new v(t)).d=f,t.e=a,f=(t=R(t,p,i,r,0,s)).d,a=t.e,l=n),// The rounding digit, i.e. the digit after the digit that may be rounded up.
c=f[i],u=s/2,l=l||void 0!==f[i+1],l=r<4?(void 0!==c||l)&&(0===r||r===(t.s<0?3:2)):c>u||c===u&&(4===r||l||6===r&&1&f[i-1]||r===(t.s<0?8:7)),f.length=i,l)for(;++f[--i]>s-1;)f[i]=0,i||(++a,f.unshift(1));// Determine trailing zeros.
for(h=f.length;!f[h-1];--h);// E.g. [4, 11, 15] becomes 4bf.
for(c=0,d="";c<h;c++)d+=o.charAt(f[c]);// Add binary exponent suffix?
if(y){if(h>1){if(16==e||8==e){for(c=16==e?4:3,--h;h%c;h++)d+="0";for(h=(f=A(d,s,e)).length;!f[h-1];--h);// xd[0] will always be be 1
for(c=1,d="1.";c<h;c++)d+=o.charAt(f[c])}else d=d.charAt(0)+"."+d.slice(1)}d=d+(a<0?"p":"p+")+a}else if(a<0){for(;++a;)d="0"+d;d="0."+d}else if(++a>h)for(a-=h;a--;)d+="0";else a<h&&(d=d.slice(0,a)+"."+d.slice(a))}else d=y?"0p+0":"0";d=(16==e?"0x":2==e?"0b":8==e?"0o":"")+d}else d=B(t);return t.s<0?"-"+d:d}// Does not strip trailing zeros.
function J(t,e){if(t.length>e)return t.length=e,!0}// Decimal methods
/*
   *  abs
   *  acos
   *  acosh
   *  add
   *  asin
   *  asinh
   *  atan
   *  atanh
   *  atan2
   *  cbrt
   *  ceil
   *  clamp
   *  clone
   *  config
   *  cos
   *  cosh
   *  div
   *  exp
   *  floor
   *  hypot
   *  ln
   *  log
   *  log2
   *  log10
   *  max
   *  min
   *  mod
   *  mul
   *  pow
   *  random
   *  round
   *  set
   *  sign
   *  sin
   *  sinh
   *  sqrt
   *  sub
   *  sum
   *  tan
   *  tanh
   *  trunc
   *//*
   * Return a new Decimal whose value is the absolute value of `x`.
   *
   * x {number|string|Decimal}
   *
   */function Q(t){return new this(t).abs()}/*
   * Return a new Decimal whose value is the arccosine in radians of `x`.
   *
   * x {number|string|Decimal}
   *
   */function G(t){return new this(t).acos()}/*
   * Return a new Decimal whose value is the inverse of the hyperbolic cosine of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function X(t){return new this(t).acosh()}/*
   * Return a new Decimal whose value is the sum of `x` and `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */function K(t,e){return new this(t).plus(e)}/*
   * Return a new Decimal whose value is the arcsine in radians of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */function W(t){return new this(t).asin()}/*
   * Return a new Decimal whose value is the inverse of the hyperbolic sine of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function tt(t){return new this(t).asinh()}/*
   * Return a new Decimal whose value is the arctangent in radians of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */function te(t){return new this(t).atan()}/*
   * Return a new Decimal whose value is the inverse of the hyperbolic tangent of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function tn(t){return new this(t).atanh()}/*
   * Return a new Decimal whose value is the arctangent in radians of `y/x` in the range -pi to pi
   * (inclusive), rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi, pi]
   *
   * y {number|string|Decimal} The y-coordinate.
   * x {number|string|Decimal} The x-coordinate.
   *
   * atan2(±0, -0)               = ±pi
   * atan2(±0, +0)               = ±0
   * atan2(±0, -x)               = ±pi for x > 0
   * atan2(±0, x)                = ±0 for x > 0
   * atan2(-y, ±0)               = -pi/2 for y > 0
   * atan2(y, ±0)                = pi/2 for y > 0
   * atan2(±y, -Infinity)        = ±pi for finite y > 0
   * atan2(±y, +Infinity)        = ±0 for finite y > 0
   * atan2(±Infinity, x)         = ±pi/2 for finite x
   * atan2(±Infinity, -Infinity) = ±3*pi/4
   * atan2(±Infinity, +Infinity) = ±pi/4
   * atan2(NaN, x) = NaN
   * atan2(y, NaN) = NaN
   *
   */function ti(t,e){t=new this(t),e=new this(e);var n,i=this.precision,r=this.rounding,o=i+4;return t.s&&e.s?t.d||e.d?!e.d||t.isZero()?(n=e.s<0?P(this,i,r):new this(0)).s=t.s:!t.d||e.isZero()?(n=P(this,o,1).times(.5)).s=t.s:e.s<0?(this.precision=o,this.rounding=1,n=this.atan(R(t,e,o,1)),e=P(this,o,1),this.precision=i,this.rounding=r,n=t.s<0?n.minus(e):n.plus(e)):n=this.atan(R(t,e,o,1)):(n=P(this,o,1).times(e.s>0?.25:.75)).s=t.s:n=new this(NaN),n}/*
   * Return a new Decimal whose value is the cube root of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */function tr(t){return new this(t).cbrt()}/*
   * Return a new Decimal whose value is `x` rounded to an integer using `ROUND_CEIL`.
   *
   * x {number|string|Decimal}
   *
   */function to(t){return T(t=new this(t),t.e+1,2)}/*
   * Return a new Decimal whose value is `x` clamped to the range delineated by `min` and `max`.
   *
   * x {number|string|Decimal}
   * min {number|string|Decimal}
   * max {number|string|Decimal}
   *
   */function ts(t,e,n){return new this(t).clamp(e,n)}/*
   * Configure global settings for a Decimal constructor.
   *
   * `obj` is an object with one or more of the following properties,
   *
   *   precision  {number}
   *   rounding   {number}
   *   toExpNeg   {number}
   *   toExpPos   {number}
   *   maxE       {number}
   *   minE       {number}
   *   modulo     {number}
   *   crypto     {boolean|number}
   *   defaults   {true}
   *
   * E.g. Decimal.config({ precision: 20, rounding: 4 })
   *
   */function ta(t){if(!t||"object"!=typeof t)throw Error(l+"Object expected");var e,n,i,r=!0===t.defaults,o=["precision",1,1e9,"rounding",0,8,"toExpNeg",-9e15,0,"toExpPos",0,9e15,"maxE",0,9e15,"minE",-9e15,0,"modulo",0,9];for(e=0;e<o.length;e+=3)if(n=o[e],r&&(this[n]=c[n]),void 0!==(i=t[n])){if(y(i)===i&&i>=o[e+1]&&i<=o[e+2])this[n]=i;else throw Error(d+n+": "+i)}if(n="crypto",r&&(this[n]=c[n]),void 0!==(i=t[n])){if(!0===i||!1===i||0===i||1===i){if(i){if("undefined"!=typeof crypto&&crypto&&(crypto.getRandomValues||crypto.randomBytes))this[n]=!0;else throw Error(p)}else this[n]=!1}else throw Error(d+n+": "+i)}return this}/*
   * Return a new Decimal whose value is the cosine of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function tc(t){return new this(t).cos()}/*
   * Return a new Decimal whose value is the hyperbolic cosine of `x`, rounded to precision
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function tu(t){return new this(t).cosh()}/*
   * Return a new Decimal whose value is `x` divided by `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */function th(t,e){return new this(t).div(e)}/*
   * Return a new Decimal whose value is the natural exponential of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} The power to which to raise the base of the natural log.
   *
   */function tl(t){return new this(t).exp()}/*
   * Return a new Decimal whose value is `x` round to an integer using `ROUND_FLOOR`.
   *
   * x {number|string|Decimal}
   *
   */function td(t){return T(t=new this(t),t.e+1,3)}/*
   * Return a new Decimal whose value is the square root of the sum of the squares of the arguments,
   * rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * hypot(a, b, ...) = sqrt(a^2 + b^2 + ...)
   *
   * arguments {number|string|Decimal}
   *
   */function tf(){var t,e,n=new this(0);for(t=0,h=!1;t<arguments.length;)if(e=new this(arguments[t++]),e.d)n.d&&(n=n.plus(e.times(e)));else{if(e.s)return h=!0,new this(1/0);n=e}return h=!0,n.sqrt()}/*
   * Return true if object is a Decimal instance (where Decimal is any Decimal constructor),
   * otherwise return false.
   *
   */function tp(t){return t instanceof e||t&&t.toStringTag===v||!1}/*
   * Return a new Decimal whose value is the natural logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */function tv(t){return new this(t).ln()}/*
   * Return a new Decimal whose value is the log of `x` to the base `y`, or to base 10 if no base
   * is specified, rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * log[y](x)
   *
   * x {number|string|Decimal} The argument of the logarithm.
   * y {number|string|Decimal} The base of the logarithm.
   *
   */function ty(t,e){return new this(t).log(e)}/*
   * Return a new Decimal whose value is the base 2 logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */function tg(t){return new this(t).log(2)}/*
   * Return a new Decimal whose value is the base 10 logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */function tm(t){return new this(t).log(10)}/*
   * Return a new Decimal whose value is the maximum of the arguments.
   *
   * arguments {number|string|Decimal}
   *
   */function tw(){return F(this,arguments,"lt")}/*
   * Return a new Decimal whose value is the minimum of the arguments.
   *
   * arguments {number|string|Decimal}
   *
   */function tb(){return F(this,arguments,"gt")}/*
   * Return a new Decimal whose value is `x` modulo `y`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */function tx(t,e){return new this(t).mod(e)}/*
   * Return a new Decimal whose value is `x` multiplied by `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */function tS(t,e){return new this(t).mul(e)}/*
   * Return a new Decimal whose value is `x` raised to the power `y`, rounded to precision
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} The base.
   * y {number|string|Decimal} The exponent.
   *
   */function tE(t,e){return new this(t).pow(e)}/*
   * Returns a new Decimal with a random value equal to or greater than 0 and less than 1, and with
   * `sd`, or `Decimal.precision` if `sd` is omitted, significant digits (or less if trailing zeros
   * are produced).
   *
   * [sd] {number} Significant digits. Integer, 0 to MAX_DIGITS inclusive.
   *
   */function tO(t){var e,n,i,r,o=0,s=new this(1),a=[];if(void 0===t?t=this.precision:_(t,1,1e9),i=Math.ceil(t/7),this.crypto){if(crypto.getRandomValues)for(e=crypto.getRandomValues(new Uint32Array(i));o<i;)// 0 <= n < 4294967296
// Probability n >= 4.29e9, is 4967296 / 4294967296 = 0.00116 (1 in 865).
(r=e[o])>=429e7?e[o]=crypto.getRandomValues(new Uint32Array(1))[0]:// 0 <= (n % 1e7) <= 9999999
a[o++]=r%1e7;else if(crypto.randomBytes){for(// buffer
e=crypto.randomBytes(i*=4);o<i;)// Probability n >= 2.14e9, is 7483648 / 2147483648 = 0.0035 (1 in 286).
// 0 <= n < 2147483648
(r=e[o]+(e[o+1]<<8)+(e[o+2]<<16)+((127&e[o+3])<<24))>=214e7?crypto.randomBytes(4).copy(e,o):(// 0 <= n <= 2139999999
// 0 <= (n % 1e7) <= 9999999
a.push(r%1e7),o+=4);o=i/4}else throw Error(p)}else for(;o<i;)a[o++]=1e7*Math.random()|0;// Remove trailing words which are zero.
for(i=a[--o],t%=7,i&&t&&(r=g(10,7-t),a[o]=(i/r|0)*r);0===a[o];o--)a.pop();// Zero?
if(o<0)n=0,a=[0];else{// Remove leading words which are zero and adjust exponent accordingly.
for(n=-1;0===a[0];n-=7)a.shift();// Count the digits of the first word of rd to determine leading zeros.
for(i=1,r=a[0];r>=10;r/=10)i++;i<7&&(n-=7-i)}return s.e=n,s.d=a,s}/*
   * Return a new Decimal whose value is `x` rounded to an integer using rounding mode `rounding`.
   *
   * To emulate `Math.round`, set rounding to 7 (ROUND_HALF_CEIL).
   *
   * x {number|string|Decimal}
   *
   */function tN(t){return T(t=new this(t),t.e+1,this.rounding)}/*
   * Return
   *   1    if x > 0,
   *  -1    if x < 0,
   *   0    if x is 0,
   *  -0    if x is -0,
   *   NaN  otherwise
   *
   * x {number|string|Decimal}
   *
   */function t_(t){return(t=new this(t)).d?t.d[0]?t.s:0*t.s:t.s||NaN}/*
   * Return a new Decimal whose value is the sine of `x`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function tM(t){return new this(t).sin()}/*
   * Return a new Decimal whose value is the hyperbolic sine of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function tA(t){return new this(t).sinh()}/*
   * Return a new Decimal whose value is the square root of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */function tR(t){return new this(t).sqrt()}/*
   * Return a new Decimal whose value is `x` minus `y`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */function tT(t,e){return new this(t).sub(e)}/*
   * Return a new Decimal whose value is the sum of the arguments, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * Only the result is rounded, not the intermediate calculations.
   *
   * arguments {number|string|Decimal}
   *
   */function tD(){var t=0,e=arguments,n=new this(e[t]);for(h=!1;n.s&&++t<e.length;)n=n.plus(e[t]);return h=!0,T(n,this.precision,this.rounding)}/*
   * Return a new Decimal whose value is the tangent of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function tL(t){return new this(t).tan()}/*
   * Return a new Decimal whose value is the hyperbolic tangent of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function tk(t){return new this(t).tanh()}/*
   * Return a new Decimal whose value is `x` truncated to an integer.
   *
   * x {number|string|Decimal}
   *
   */function tP(t){return T(t=new this(t),t.e+1,1)}// Create and configure initial Decimal constructor.
(e=/*
   * Create and return a Decimal constructor with the same configuration properties as this Decimal
   * constructor.
   *
   */function t(n){var i,r,o;/*
     * The Decimal constructor and exported function.
     * Return a new Decimal instance.
     *
     * v {number|string|Decimal} A numeric value.
     *
     */function s(t){var n,i,r;// Decimal called without new.
if(!(this instanceof s))return new s(t);// Duplicate.
if(// Retain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
// which points to Object.
this.constructor=s,tp(t)){this.s=t.s,h?!t.d||t.e>s.maxE?(// Infinity.
this.e=NaN,this.d=null):t.e<s.minE?(// Zero.
this.e=0,this.d=[0]):(this.e=t.e,this.d=t.d.slice()):(this.e=t.e,this.d=t.d?t.d.slice():t.d);return}if("number"==(r=typeof t)){if(0===t){this.s=1/t<0?-1:1,this.e=0,this.d=[0];return}// Fast path for small integers.
if(t<0?(t=-t,this.s=-1):this.s=1,t===~~t&&t<1e7){for(n=0,i=t;i>=10;i/=10)n++;h?n>s.maxE?(this.e=NaN,this.d=null):n<s.minE?(this.e=0,this.d=[0]):(this.e=n,this.d=[t]):(this.e=n,this.d=[t]);return;// Infinity, NaN.
}if(0*t!=0){t||(this.s=NaN),this.e=NaN,this.d=null;return}return Y(this,t.toString())}if("string"!==r)throw Error(d+t);return 45===(i=t.charCodeAt(0))?(t=t.slice(1),this.s=-1):(43===i&&(t=t.slice(1)),this.s=1),x.test(t)?Y(this,t):/*
   * Parse the value of a new Decimal `x` from a string `str`, which is not a decimal value.
   */function(t,n){var i,r,o,s,a,c,u,l,f;if(n.indexOf("_")>-1){if(n=n.replace(/(\d)_(?=\d)/g,"$1"),x.test(n))return Y(t,n)}else if("Infinity"===n||"NaN"===n)return+n||(t.s=NaN),t.e=NaN,t.d=null,t;if(w.test(n))i=16,n=n.toLowerCase();else if(m.test(n))i=2;else if(b.test(n))i=8;else throw Error(d+n);// Remove trailing zeros.
for(// Is there a binary exponent part?
(s=n.search(/p/i))>0?(u=+n.slice(s+1),n=n.substring(2,s)):n=n.slice(2),a=// Convert `str` as an integer then divide the result by `base` raised to a power such that the
// fraction part will be restored.
(s=n.indexOf("."))>=0,r=t.constructor,a&&(s=(c=(n=n.replace(".","")).length)-s,// log[10](16) = 1.2041... , log[10](88) = 1.9444....
o=j(r,new r(i),s,2*s)),s=f=(l=A(n,i,1e7)).length-1;0===l[s];--s)l.pop();return s<0?new r(0*t.s):(t.e=L(l,f),t.d=l,h=!1,a&&(t=R(t,o,4*c)),u&&(t=t.times(54>Math.abs(u)?g(2,u):e.pow(2,u))),h=!0,t)}(this,t)}if(s.prototype=O,s.ROUND_UP=0,s.ROUND_DOWN=1,s.ROUND_CEIL=2,s.ROUND_FLOOR=3,s.ROUND_HALF_UP=4,s.ROUND_HALF_DOWN=5,s.ROUND_HALF_EVEN=6,s.ROUND_HALF_CEIL=7,s.ROUND_HALF_FLOOR=8,s.EUCLID=9,s.config=s.set=ta,s.clone=t,s.isDecimal=tp,s.abs=Q,s.acos=G,s.acosh=X,s.add=K,s.asin=W,s.asinh=tt,s.atan=te,s.atanh=tn,s.atan2=ti,s.cbrt=tr,s.ceil=to,s.clamp=ts,s.cos=tc,s.cosh=tu,s.div=th,s.exp=tl,s.floor=td,s.hypot=tf,s.ln=tv,s.log=ty,s.log10=tm,s.log2=tg,s.max=tw,s.min=tb,s.mod=tx,s.mul=tS,s.pow=tE,s.random=tO,s.round=tN,s.sign=t_,s.sin=tM,s.sinh=tA,s.sqrt=tR,s.sub=tT,s.sum=tD,s.tan=tL,s.tanh=tk,s.trunc=tP,void 0===n&&(n={}),n&&!0!==n.defaults)for(i=0,o=["precision","rounding","toExpNeg","toExpPos","maxE","minE","modulo","crypto"];i<o.length;)n.hasOwnProperty(r=o[i++])||(n[r]=this[r]);return s.config(n),s}(c)).prototype.constructor=e,e.default=e.Decimal=e,// Create the internal constants from their string values.
s=new e(s),a=new e(a),"function"==typeof define&&define.amd?define(function(){return e}):u?("function"==typeof Symbol&&"symbol"==typeof Symbol.iterator&&(O[Symbol.for("nodejs.util.inspect.custom")]=O.toString,O[Symbol.toStringTag]="Decimal"),u=e):(t||(t="undefined"!=typeof self&&self&&self.self==self?self:window),i=t.Decimal,e.noConflict=function(){return t.Decimal=i,e},t.Decimal=e)}(u);/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var h=function(){return(h=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};function l(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&0>e.indexOf(i)&&(n[i]=t[i]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,i=Object.getOwnPropertySymbols(t);r<i.length;r++)0>e.indexOf(i[r])&&Object.prototype.propertyIsEnumerable.call(t,i[r])&&(n[i[r]]=t[i[r]]);return n}function d(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],i=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function f(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var i,r,o=n.call(t),s=[];try{for(;(void 0===e||e-- >0)&&!(i=o.next()).done;)s.push(i.value)}catch(t){r={error:t}}finally{try{i&&!i.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}return s}function p(t,e,n){if(n||2==arguments.length)for(var i,r=0,o=e.length;r<o;r++)!i&&r in e||(i||(i=Array.prototype.slice.call(e,0,r)),i[r]=e[r]);return t.concat(i||Array.prototype.slice.call(e))}(t=i||(i={})).Start="xstate.start",t.Stop="xstate.stop",t.Raise="xstate.raise",t.Send="xstate.send",t.Cancel="xstate.cancel",t.NullEvent="",t.Assign="xstate.assign",t.After="xstate.after",t.DoneState="done.state",t.DoneInvoke="done.invoke",t.Log="xstate.log",t.Init="xstate.init",t.Invoke="xstate.invoke",t.ErrorExecution="error.execution",t.ErrorCommunication="error.communication",t.ErrorPlatform="error.platform",t.ErrorCustom="xstate.error",t.Update="xstate.update",t.Pure="xstate.pure",t.Choose="xstate.choose",(e=r||(r={})).Parent="#_parent",e.Internal="#_internal";var v=i.Start,y=i.Stop,g=i.Raise,m=i.Send,w=i.Cancel,b=i.NullEvent,x=i.Assign;i.After,i.DoneState;var S=i.Log,E=i.Init,O=i.Invoke;i.ErrorExecution;var N=i.ErrorPlatform,_=i.ErrorCustom,M=i.Update,A=i.Choose,R=i.Pure,T={},D="xstate.guard";function L(t,e,n){void 0===n&&(n=".");var i=C(t,n),r=C(e,n);return Q(r)?!!Q(i)&&r===i:Q(i)?i in r:Object.keys(i).every(function(t){return t in r&&L(i[t],r[t])})}function k(t){try{return Q(t)||"number"==typeof t?"".concat(t):t.type}catch(t){throw Error("Events must be strings or objects with a string event.type property.")}}function P(t,e){try{if(H(t))return t;return t.toString().split(e)}catch(e){throw Error("'".concat(t,"' is not a valid state path."))}}function C(t,e){return"object"==typeof t&&"value"in t&&"context"in t&&"event"in t&&"_event"in t?t.value:H(t)?I(t):"string"!=typeof t?t:I(P(t,e))}function I(t){if(1===t.length)return t[0];for(var e={},n=e,i=0;i<t.length-1;i++)i===t.length-2?n[t[i]]=t[i+1]:(n[t[i]]={},n=n[t[i]]);return e}function j(t,e){for(var n={},i=Object.keys(t),r=0;r<i.length;r++){var o=i[r];n[o]=e(t[o],o,t,r)}return n}function U(t,e,n){var i,r,o={};try{for(var s=d(Object.keys(t)),a=s.next();!a.done;a=s.next()){var c=a.value,u=t[c];n(u)&&(o[c]=e(u,c,t))}}catch(t){i={error:t}}finally{try{a&&!a.done&&(r=s.return)&&r.call(s)}finally{if(i)throw i.error}}return o}/**
 * Retrieves a value at the given path.
 * @param props The deep path to the prop of the desired value
 */var F=function(t){return function(e){var n,i,r=e;try{for(var o=d(t),s=o.next();!s.done;s=o.next())r=r[s.value]}catch(t){n={error:t}}finally{try{s&&!s.done&&(i=o.return)&&i.call(o)}finally{if(n)throw n.error}}return r}};function V(t){return t?Q(t)?[[t]]:q(Object.keys(t).map(function(e){var n=t[e];return"string"==typeof n||n&&Object.keys(n).length?V(t[e]).map(function(t){return[e].concat(t)}):[[e]]})):[[]]}function q(t){var e;return(e=[]).concat.apply(e,p([],f(t),!1))}function B(t){return void 0===t?[]:H(t)?t:[t]}function Y(t,e,n){if(J(t))return t(e,n.data);var i,r,o={};try{for(var s=d(Object.keys(t)),a=s.next();!a.done;a=s.next()){var c=a.value,u=t[c];J(u)?o[c]=u(e,n.data):o[c]=u}}catch(t){i={error:t}}finally{try{a&&!a.done&&(r=s.return)&&r.call(s)}finally{if(i)throw i.error}}return o}function Z(t){return!!(t instanceof Promise||null!==t&&(J(t)||"object"==typeof t)&&J(t.then))}function $(t,e,n,i){return t?n.reduce(function(t,n){var r,o,s=n.assignment,a={state:i,action:n,_event:e},c={};if(J(s))c=s(t,e.data,a);else try{for(var u=d(Object.keys(s)),h=u.next();!h.done;h=u.next()){var l=h.value,f=s[l];c[l]=J(f)?f(t,e.data,a):f}}catch(t){r={error:t}}finally{try{h&&!h.done&&(o=u.return)&&o.call(u)}finally{if(r)throw r.error}}return Object.assign({},t,c)},t):t}// tslint:disable-next-line:no-empty
var z=function(){};function H(t){return Array.isArray(t)}// tslint:disable-next-line:ban-types
function J(t){return"function"==typeof t}function Q(t){return"string"==typeof t}function G(t,e){if(t)return Q(t)?{type:D,name:t,predicate:e?e[t]:void 0}:J(t)?{type:D,name:t.name,predicate:t}:t}var X="function"==typeof Symbol&&Symbol.observable||"@@observable";// TODO: to be removed in v5, left it out just to minimize the scope of the change and maintain compatibility with older versions of integration paackages
function K(t){return!!t&&"__xstatenode"in t}function W(t,e// id?: TEvent['type']
){return Q(t)||"number"==typeof t?h({type:t},e):t}function tt(t,e){if(!Q(t)&&"$$type"in t&&"scxml"===t.$$type)return t;var n=W(t);return h({name:n.type,data:n,$$type:"scxml",type:"external"},e)}function te(t,e){return(H(e)?e:[e]).map(function(e){return void 0===e||"string"==typeof e||K(e)?{target:e,event:t}:h(h({},e),{event:t})})}function tn(t,e,n,i,r){var o=t.options.guards,s={state:r,cond:e,_event:i};if(e.type===D)return((null==o?void 0:o[e.name])||e.predicate)(n,i.data,s);var a=null==o?void 0:o[e.type];if(!a)throw Error("Guard '".concat(e.type,"' is not implemented on machine '").concat(t.id,"'."));return a(n,i.data,s)}function ti(t){return"string"==typeof t?{type:t}:t}function tr(t,e,n){var i=function(){},r="object"==typeof t,o=r?t:null;return{next:((r?t.next:t)||i).bind(o),error:((r?t.error:e)||i).bind(o),complete:((r?t.complete:n)||i).bind(o)}}function to(t,e){return"".concat(t,":invocation[").concat(e,"]")}function ts(t){return(t.type===g||t.type===m&&t.to===r.Internal)&&"number"!=typeof t.delay}(o={})[X]=function(){return this},o[Symbol.observable]=function(){return this};var ta=tt({type:E});function tc(t,e){return e&&e[t]||void 0}function tu(t,e){var n;if(Q(t)||"number"==typeof t){var i=tc(t,e);n=J(i)?{type:t,exec:i}:i||{type:t,exec:void 0}}else if(J(t))n={// Convert action to string if unnamed
type:t.name||t.toString(),exec:t};else{var i=tc(t.type,e);if(J(i))n=h(h({},t),{exec:i});else if(i){var r=i.type||t.type;n=h(h(h({},i),t),{type:r})}else n=t}return n}var th=function(t,e){return t?(H(t)?t:[t]).map(function(t){return tu(t,e)}):[]};function tl(t){var e=tu(t);return h(h({id:Q(t)?t:e.id},e),{type:e.type})}/**
 * Returns an event that represents that a final state node
 * has been reached in the parent state node.
 *
 * @param id The final state node's parent state node `id`
 * @param data The data to pass into the event
 */function td(t,e){var n="".concat(i.DoneState,".").concat(t),r={type:n,data:e};return r.toString=function(){return n},r}/**
 * Returns an event that represents that an invoked service has terminated.
 *
 * An invoked service is terminated when it has reached a top-level final state node,
 * but not when it is canceled.
 *
 * @param id The final state node ID
 * @param data The data to pass into the event
 */function tf(t,e){var n="".concat(i.DoneInvoke,".").concat(t),r={type:n,data:e};return r.toString=function(){return n},r}function tp(t,e){var n="".concat(i.ErrorPlatform,".").concat(t),r={type:n,data:e};return r.toString=function(){return n},r}var tv=function(t){var e,n,i=[];try{for(var r=d(t),o=r.next();!o.done;o=r.next())for(var s=o.value,a=0;a<s.actions.length;){if(s.actions[a].type===x){i.push(s.actions[a]),s.actions.splice(a,1);continue}a++}}catch(t){e={error:t}}finally{try{o&&!o.done&&(n=r.return)&&n.call(r)}finally{if(e)throw e.error}}return i};function ty(t,e,n,o,s,a,c){void 0===c&&(c=!1);var u=c?[]:tv(s),l=u.length?$(n,o,u,e):n,v=c?[n]:void 0,w=[];return[q(s.map(function(s){var u,b,E=[];try{for(var O=d(s.actions),N=O.next();!N.done;N=O.next()){var _=N.value,M=function(s,u){var d;switch(u.type){case g:var b=function(t,e,n,i){var r,o={_event:n},s=tt(J(t.event)?t.event(e,n.data,o):t.event);if(Q(t.delay)){var a=i&&i[t.delay];r=J(a)?a(e,n.data,o):a}else r=J(t.delay)?t.delay(e,n.data,o):t.delay;return h(h({},t),{type:g,_event:s,delay:r})}(u,l,o,t.options.delays);return a&&"number"==typeof b.delay&&a(b,l,o),b;case m:var E=function(t,e,n,i){var r,o={_event:n},s=tt(J(t.event)?t.event(e,n.data,o):t.event);// TODO: helper function for resolving Expr
if(Q(t.delay)){var a=i&&i[t.delay];r=J(a)?a(e,n.data,o):a}else r=J(t.delay)?t.delay(e,n.data,o):t.delay;var c=J(t.to)?t.to(e,n.data,o):t.to;return h(h({},t),{to:c,_event:s,event:s.data,delay:r})}(u,l,o,t.options.delays);// TODO: fix ActionTypes.Init
return a&&E.to!==r.Internal&&("entry"===s?w.push(E):a(E,l,o)),E;case S:var O,N=(O=l,h(h({},u),{value:Q(u.expr)?u.expr:u.expr(O,o.data,{_event:o})}));return null==a||a(N,l,o),N;case A:var _=null===(d=u.conds.find(function(n){var i=G(n.cond,t.options.guards);return!i||tn(t,i,l,o,a?void 0:e)}))||void 0===d?void 0:d.actions;if(!_)return[];var M=f(ty(t,e,l,o,[{type:s,actions:th(B(_),t.options.actions)}],a,c),2),T=M[0];return l=M[1],null==v||v.push(l),T;case R:var _=u.get(l,o.data);if(!_)return[];var D=f(ty(t,e,l,o,[{type:s,actions:th(B(_),t.options.actions)}],a,c),2),L=D[0];return l=D[1],null==v||v.push(l),L;case y:var k,P,N=(k=l,P=J(u.activity)?u.activity(k,o.data):u.activity,{type:i.Stop,activity:"string"==typeof P?{id:P}:P});return null==a||a(N,n,o),N;case x:l=$(l,o,[u],a?void 0:e),null==v||v.push(l);break;default:var C=tu(u,t.options.actions),I=C.exec;if(a)a(C,l,o);else if(I&&v){var j=v.length-1;C=h(h({},C),{exec:function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];I.apply(void 0,p([v[j]],f(e),!1))}})}return C}}(s.type,_);M&&(E=E.concat(M))}}catch(t){u={error:t}}finally{try{N&&!N.done&&(b=O.return)&&b.call(O)}finally{if(u)throw u.error}}return w.forEach(function(t){a(t,l,o)}),w.length=0,E})),l]}var tg=function(t){return"atomic"===t.type||"final"===t.type};function tm(t){return Object.keys(t.states).map(function(e){return t.states[e]})}function tw(t){return tm(t).filter(function(t){return"history"!==t.type})}function tb(t,e){var n,i,r,o,s,a,c,u,h=tx(new Set(t)),l=new Set(e);try{// add all ancestors
for(var f=d(l),p=f.next();!p.done;p=f.next())for(var v=p.value,y=v.parent;y&&!l.has(y);)l.add(y),y=y.parent}catch(t){n={error:t}}finally{try{p&&!p.done&&(i=f.return)&&i.call(f)}finally{if(n)throw n.error}}var g=tx(l);try{// add descendants
for(var m=d(l),w=m.next();!w.done;w=m.next()){var v=w.value;// if previously active, add existing child nodes
if("compound"!==v.type||g.get(v)&&g.get(v).length){if("parallel"===v.type)try{for(var b=(s=void 0,d(tw(v))),x=b.next();!x.done;x=b.next()){var S=x.value;l.has(S)||(l.add(S),h.get(S)?h.get(S).forEach(function(t){return l.add(t)}):S.initialStateNodes.forEach(function(t){return l.add(t)}))}}catch(t){s={error:t}}finally{try{x&&!x.done&&(a=b.return)&&a.call(b)}finally{if(s)throw s.error}}}else h.get(v)?h.get(v).forEach(function(t){return l.add(t)}):v.initialStateNodes.forEach(function(t){return l.add(t)})}}catch(t){r={error:t}}finally{try{w&&!w.done&&(o=m.return)&&o.call(m)}finally{if(r)throw r.error}}try{// add all ancestors
for(var E=d(l),O=E.next();!O.done;O=E.next())for(var v=O.value,y=v.parent;y&&!l.has(y);)l.add(y),y=y.parent}catch(t){c={error:t}}finally{try{O&&!O.done&&(u=E.return)&&u.call(E)}finally{if(c)throw c.error}}return l}function tx(t){var e,n,i=new Map;try{for(var r=d(t),o=r.next();!o.done;o=r.next()){var s=o.value;i.has(s)||i.set(s,[]),s.parent&&(i.has(s.parent)||i.set(s.parent,[]),i.get(s.parent).push(s))}}catch(t){e={error:t}}finally{try{o&&!o.done&&(n=r.return)&&n.call(r)}finally{if(e)throw e.error}}return i}function tS(t,e){return Array.isArray(t)?t.some(function(t){return t===e}):t instanceof Set&&t.has(e)}function tE(t,e){return"compound"===e.type?tw(e).some(function(e){return"final"===e.type&&tS(t,e)}):"parallel"===e.type&&tw(e).every(function(e){return tE(t,e)})}function tO(t){return new Set(q(t.map(function(t){return t.tags})))}var tN=/*#__PURE__*//** @class */function(){/**
   * Creates a new State instance.
   * @param value The state value
   * @param context The extended state
   * @param historyValue The tree representing historical values of the state nodes
   * @param history The previous state
   * @param actions An array of action objects to execute as side-effects
   * @param activities A mapping of activities and whether they are started (`true`) or stopped (`false`).
   * @param meta
   * @param events Internal event queue. Should be empty with run-to-completion semantics.
   * @param configuration
   */function t(t){var e,n,i=this;this.actions=[],this.activities=T,this.meta={},this.events=[],this.value=t.value,this.context=t.context,this._event=t._event,this._sessionid=t._sessionid,this.event=this._event.data,this.historyValue=t.historyValue,this.history=t.history,this.actions=t.actions||[],this.activities=t.activities||T,this.meta=(void 0===(e=t.configuration)&&(e=[]),e.reduce(function(t,e){return void 0!==e.meta&&(t[e.id]=e.meta),t},{})),this.events=t.events||[],this.matches=this.matches.bind(this),this.toStrings=this.toStrings.bind(this),this.configuration=t.configuration,this.transitions=t.transitions,this.children=t.children,this.done=!!t.done,this.tags=null!==(n=Array.isArray(t.tags)?new Set(t.tags):t.tags)&&void 0!==n?n:new Set,this.machine=t.machine,Object.defineProperty(this,"nextEvents",{get:function(){var t;return t=i.configuration,p([],f(new Set(q(p([],f(t.map(function(t){return t.ownEvents})),!1)))),!1)}})}return(/**
   * Creates a new State instance for the given `stateValue` and `context`.
   * @param stateValue
   * @param context
   */t.from=function(e,n){return e instanceof t?e.context!==n?new t({value:e.value,context:n,_event:e._event,_sessionid:null,historyValue:e.historyValue,history:e.history,actions:[],activities:e.activities,meta:{},events:[],configuration:[],transitions:[],children:{}}):e:new t({value:e,context:n,_event:ta,_sessionid:null,historyValue:void 0,history:void 0,actions:[],activities:void 0,meta:void 0,events:[],configuration:[],transitions:[],children:{}})},/**
   * Creates a new State instance for the given `config`.
   * @param config The state config
   */t.create=function(e){return new t(e)},/**
   * Creates a new `State` instance for the given `stateValue` and `context` with no actions (side-effects).
   * @param stateValue
   * @param context
   */t.inert=function(e,n){return e instanceof t?e.actions.length?new t({value:e.value,context:n,_event:ta,_sessionid:null,historyValue:e.historyValue,history:e.history,activities:e.activities,configuration:e.configuration,transitions:[],children:{}}):e:t.from(e,n)},/**
   * Returns an array of all the string leaf state node paths.
   * @param stateValue
   * @param delimiter The character(s) that separate each subpath in the string state node path.
   */t.prototype.toStrings=function(t,e){var n=this;if(void 0===t&&(t=this.value),void 0===e&&(e="."),Q(t))return[t];var i=Object.keys(t);return i.concat.apply(i,p([],f(i.map(function(i){return n.toStrings(t[i],e).map(function(t){return i+e+t})})),!1))},t.prototype.toJSON=function(){this.configuration,this.transitions;var t=this.tags;this.machine;var e=l(this,["configuration","transitions","tags","machine"]);return h(h({},e),{tags:Array.from(t)})},t.prototype.matches=function(t){return L(t,this.value)},/**
   * Whether the current state configuration has a state node with the specified `tag`.
   * @param tag
   */t.prototype.hasTag=function(t){return this.tags.has(t)},/**
   * Determines whether sending the `event` will cause a non-forbidden transition
   * to be selected, even if the transitions have no actions nor
   * change the state value.
   *
   * @param event The event to test
   * @returns Whether the event will cause a transition
   */t.prototype.can=function(t){z(!!this.machine,"state.can(...) used outside of a machine-created State object; this will always return false.");var e,n=null===(e=this.machine)||void 0===e?void 0:e.getTransitionData(this,t);return!!(null==n?void 0:n.transitions.length)&&// Check that at least one transition is not forbidden
n.transitions.some(function(t){return void 0!==t.target||t.actions.length})},t)}(),t_={deferEvents:!1},tM=/*#__PURE__*//** @class */function(){function t(t){this.processingEvent=!1,this.queue=[],this.initialized=!1,this.options=h(h({},t_),t)}return t.prototype.initialize=function(t){if(this.initialized=!0,t){if(!this.options.deferEvents){this.schedule(t);return}this.process(t)}this.flushEvents()},t.prototype.schedule=function(t){if(!this.initialized||this.processingEvent){this.queue.push(t);return}if(0!==this.queue.length)throw Error("Event queue should be empty when it is not processing events");this.process(t),this.flushEvents()},t.prototype.clear=function(){this.queue=[]},t.prototype.flushEvents=function(){for(var t=this.queue.shift();t;)this.process(t),t=this.queue.shift()},t.prototype.process=function(t){this.processingEvent=!0;try{t()}catch(t){throw(// there is no use to keep the future events
// as the situation is not anymore the same
this.clear(),t)}finally{this.processingEvent=!1}},t}(),tA=[],tR=function(t,e){tA.push(t);var n=e(t);return tA.pop(),n};function tT(t){var e;return(e={id:t,send:function(){},subscribe:function(){return{unsubscribe:function(){}}},getSnapshot:function(){},toJSON:function(){return{id:t}}})[X]=function(){return this},e}function tD(t,e,n){var i=tT(e);// @ts-ignore
if(i.deferred=!0,K(t)){// "mute" the existing service scope so potential spawned actors within the `.initialState` stay deferred here
var r=i.state=tR(void 0,function(){return(n?t.withContext(n):t).initialState});i.getSnapshot=function(){return r}}return i}var tL=/*#__PURE__*/new Map,tk=0,tP={bookId:function(){return"x:".concat(tk++)},register:function(t,e){return tL.set(t,e),t},get:function(t){return tL.get(t)},free:function(t){tL.delete(t)}};function tC(){return"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==a?a:void 0}var tI={sync:!1,autoForward:!1};(n=s||(s={}))[n.NotStarted=0]="NotStarted",n[n.Running=1]="Running",n[n.Stopped=2]="Stopped";var tj=/*#__PURE__*//** @class */function(){/**
   * Creates a new Interpreter instance (i.e., service) for the given machine with the provided options, if any.
   *
   * @param machine The machine to be interpreted
   * @param options Interpreter options
   */function t(e,n){void 0===n&&(n=t.defaultOptions);var o=this;this.machine=e,this.delayedEventsMap={},this.listeners=new Set,this.contextListeners=new Set,this.stopListeners=new Set,this.doneListeners=new Set,this.eventListeners=new Set,this.sendListeners=new Set,/**
     * Whether the service is started.
     */this.initialized=!1,this.status=s.NotStarted,this.children=new Map,this.forwardTo=new Set,this._outgoingQueue=[],/**
     * Alias for Interpreter.prototype.start
     */this.init=this.start,/**
     * Sends an event to the running interpreter to trigger a transition.
     *
     * An array of events (batched) can be sent as well, which will send all
     * batched events to the running interpreter. The listeners will be
     * notified only **once** when all events are processed.
     *
     * @param event The event(s) to send
     */this.send=function(t,e){if(H(t))return o.batch(t),o.state;var n=tt(W(t,e));if(o.status===s.Stopped)return o.state;if(o.status!==s.Running&&!o.options.deferEvents)throw Error('Event "'.concat(n.name,'" was sent to uninitialized service "').concat(o.machine.id// tslint:disable-next-line:max-line-length
,'". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.\nEvent: ').concat(JSON.stringify(n.data)));return o.scheduler.schedule(function(){// Forward copy of event to child actors
o.forward(n);var t=o._nextState(n);o.update(t,n)}),o._state;// TODO: deprecate (should return void)
// tslint:disable-next-line:semicolon
},this.sendTo=function(t,e,n){var i=o.parent&&(e===r.Parent||o.parent.id===e),a=i?o.parent:Q(e)?e===r.Internal?o:o.children.get(e)||tP.get(e):e&&"function"==typeof e.send?e:void 0;if(!a){if(!i)throw Error("Unable to send event to child '".concat(e,"' from service '").concat(o.id,"'."));return}if("machine"in a){if(o.status!==s.Stopped||o.parent!==a||// we need to send events to the parent from exit handlers of a machine that reached its final state
o.state.done){// Send SCXML events to machines
var c=h(h({},t),{name:t.name===_?"".concat(tp(o.id)):t.name,origin:o.sessionId});!n&&o.machine.config.predictableActionArguments?o._outgoingQueue.push([a,c]):a.send(c)}}else!n&&o.machine.config.predictableActionArguments?o._outgoingQueue.push([a,t.data]):a.send(t.data)},this._exec=function(t,e,n,r){void 0===r&&(r=o.machine.options.actions);var a=t.exec||tc(t.type,r),c=J(a)?a:a?a.exec:t.exec;if(c)try{return c(e,n.data,o.machine.config.predictableActionArguments?{action:t,_event:n}:{action:t,state:o.state,_event:n})}catch(t){throw o.parent&&o.parent.send({type:"xstate.error",data:t}),t}switch(t.type){case g:o.defer(t);break;case m:if("number"==typeof t.delay){o.defer(t);return}t.to?o.sendTo(t._event,t.to,n===ta):o.send(t._event);break;case w:o.cancel(t.sendId);break;case v:if(o.status!==s.Running)return;var u=t.activity;// If the activity will be stopped right after it's started
// (such as in transient states)
// don't bother starting the activity.
if(!o.machine.config.predictableActionArguments&&!o.state.activities[u.id||u.type])break;// Invoked services
if(u.type===i.Invoke){var h=ti(u.src),l=o.machine.options.services?o.machine.options.services[h.type]:void 0,d=u.id,f=u.data,p="autoForward"in u?u.autoForward:!!u.forward;if(!l)return;var b=f?Y(f,e,n):void 0;if("string"==typeof l)return;var x=J(l)?l(e,n.data,{data:b,src:h,meta:u.meta}):l;if(!x)return;var E=void 0;K(x)&&(x=b?x.withContext(b):x,E={autoForward:p}),o.spawn(x,d,E)}else o.spawnActivity(u);break;case y:o.stopChild(t.activity.id);break;case S:var O=t.label,N=t.value;O?o.logger(O,N):o.logger(N)}};var a=h(h({},t.defaultOptions),n),c=a.clock,u=a.logger,l=a.parent,d=a.id,f=void 0!==d?d:e.id;this.id=f,this.logger=u,this.clock=c,this.parent=l,this.options=a,this.scheduler=new tM({deferEvents:this.options.deferEvents}),this.sessionId=tP.bookId()}return Object.defineProperty(t.prototype,"initialState",{get:function(){var t=this;return this._initialState?this._initialState:tR(this,function(){return t._initialState=t.machine.initialState,t._initialState})},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"state",{/**
     * @deprecated Use `.getSnapshot()` instead.
     */get:function(){return this._state},enumerable:!1,configurable:!0}),/**
   * Executes the actions of the given state, with that state's `context` and `event`.
   *
   * @param state The state whose actions will be executed
   * @param actionsConfig The action implementations to use
   */t.prototype.execute=function(t,e){var n,i;try{for(var r=d(t.actions),o=r.next();!o.done;o=r.next()){var s=o.value;this.exec(s,t,e)}}catch(t){n={error:t}}finally{try{o&&!o.done&&(i=r.return)&&i.call(r)}finally{if(n)throw n.error}}},t.prototype.update=function(t,e){var n,i,r,o,s,a,c,u,h=this;// Attach session ID to state
if(t._sessionid=this.sessionId,this._state=t,(!this.machine.config.predictableActionArguments||// this is currently required to execute initial actions as the `initialState` gets cached
// we can't just recompute it (and execute actions while doing so) because we try to preserve identity of actors created within initial assigns
e===ta)&&this.options.execute)this.execute(this.state);else for(var l=void 0;l=this._outgoingQueue.shift();)l[0].send(l[1]);// Update children
// Execute listeners
if(this.children.forEach(function(t){h.state.children[t.id]=t}),this.devTools&&this.devTools.send(e.data,t),t.event)try{for(var f=d(this.eventListeners),p=f.next();!p.done;p=f.next()){var v=p.value;v(t.event)}}catch(t){n={error:t}}finally{try{p&&!p.done&&(i=f.return)&&i.call(f)}finally{if(n)throw n.error}}try{for(var y=d(this.listeners),g=y.next();!g.done;g=y.next()){var v=g.value;v(t,t.event)}}catch(t){r={error:t}}finally{try{g&&!g.done&&(o=y.return)&&o.call(y)}finally{if(r)throw r.error}}try{for(var m=d(this.contextListeners),w=m.next();!w.done;w=m.next())(0,w.value)(this.state.context,this.state.history?this.state.history.context:void 0)}catch(t){s={error:t}}finally{try{w&&!w.done&&(a=m.return)&&a.call(m)}finally{if(s)throw s.error}}if(this.state.done){// get final child state node
var b=t.configuration.find(function(t){return"final"===t.type&&t.parent===h.machine}),x=b&&b.doneData?Y(b.doneData,t.context,e):void 0;this._doneEvent=tf(this.id,x);try{for(var S=d(this.doneListeners),E=S.next();!E.done;E=S.next()){var v=E.value;v(this._doneEvent)}}catch(t){c={error:t}}finally{try{E&&!E.done&&(u=S.return)&&u.call(S)}finally{if(c)throw c.error}}this._stop(),this._stopChildren(),tP.free(this.sessionId)}},/*
   * Adds a listener that is notified whenever a state transition happens. The listener is called with
   * the next state and the event object that caused the state transition.
   *
   * @param listener The state listener
   */t.prototype.onTransition=function(t){return this.listeners.add(t),this.status===s.Running&&t(this.state,this.state.event),this},t.prototype.subscribe=function(t,e,n){var i=this,r=tr(t,e,n);this.listeners.add(r.next),this.status!==s.NotStarted&&r.next(this.state);var o=function(){i.doneListeners.delete(o),i.stopListeners.delete(o),r.complete()};return this.status===s.Stopped?r.complete():(this.onDone(o),this.onStop(o)),{unsubscribe:function(){i.listeners.delete(r.next),i.doneListeners.delete(o),i.stopListeners.delete(o)}}},/**
   * Adds an event listener that is notified whenever an event is sent to the running interpreter.
   * @param listener The event listener
   */t.prototype.onEvent=function(t){return this.eventListeners.add(t),this},/**
   * Adds an event listener that is notified whenever a `send` event occurs.
   * @param listener The event listener
   */t.prototype.onSend=function(t){return this.sendListeners.add(t),this},/**
   * Adds a context listener that is notified whenever the state context changes.
   * @param listener The context listener
   */t.prototype.onChange=function(t){return this.contextListeners.add(t),this},/**
   * Adds a listener that is notified when the machine is stopped.
   * @param listener The listener
   */t.prototype.onStop=function(t){return this.stopListeners.add(t),this},/**
   * Adds a state listener that is notified when the statechart has reached its final state.
   * @param listener The state listener
   */t.prototype.onDone=function(t){return this.status===s.Stopped&&this._doneEvent?t(this._doneEvent):this.doneListeners.add(t),this},/**
   * Removes a listener.
   * @param listener The listener to remove
   */t.prototype.off=function(t){return this.listeners.delete(t),this.eventListeners.delete(t),this.sendListeners.delete(t),this.stopListeners.delete(t),this.doneListeners.delete(t),this.contextListeners.delete(t),this},/**
   * Starts the interpreter from the given state, or the initial state.
   * @param initialState The state to start the statechart from
   */t.prototype.start=function(t){var e=this;if(this.status===s.Running)return this;// yes, it's a hack but we need the related cache to be populated for some things to work (like delayed transitions)
// this is usually called by `machine.getInitialState` but if we rehydrate from a state we might bypass this call
// we also don't want to call this method here as it resolves the full initial state which might involve calling assign actions
// and that could potentially lead to some unwanted side-effects (even such as creating some rogue actors)
this.machine._init(),tP.register(this.sessionId,this),this.initialized=!0,this.status=s.Running;var n=void 0===t?this.initialState:tR(this,function(){return"object"==typeof t&&null!==t&&"value"in t&&"_event"in t?e.machine.resolveState(t):e.machine.resolveState(tN.from(t,e.machine.context))});return this.options.devTools&&this.attachDev(),this.scheduler.initialize(function(){e.update(n,ta)}),this},t.prototype._stopChildren=function(){// TODO: think about converting those to actions
this.children.forEach(function(t){J(t.stop)&&t.stop()}),this.children.clear()},t.prototype._stop=function(){var t,e,n,i,r,o,a,c,u,h;try{for(var l=d(this.listeners),f=l.next();!f.done;f=l.next()){var p=f.value;this.listeners.delete(p)}}catch(e){t={error:e}}finally{try{f&&!f.done&&(e=l.return)&&e.call(l)}finally{if(t)throw t.error}}try{for(var v=d(this.stopListeners),y=v.next();!y.done;y=v.next()){var p=y.value;// call listener, then remove
p(),this.stopListeners.delete(p)}}catch(t){n={error:t}}finally{try{y&&!y.done&&(i=v.return)&&i.call(v)}finally{if(n)throw n.error}}try{for(var g=d(this.contextListeners),m=g.next();!m.done;m=g.next()){var p=m.value;this.contextListeners.delete(p)}}catch(t){r={error:t}}finally{try{m&&!m.done&&(o=g.return)&&o.call(g)}finally{if(r)throw r.error}}try{for(var w=d(this.doneListeners),b=w.next();!b.done;b=w.next()){var p=b.value;this.doneListeners.delete(p)}}catch(t){a={error:t}}finally{try{b&&!b.done&&(c=w.return)&&c.call(w)}finally{if(a)throw a.error}}if(!this.initialized)return this;this.initialized=!1,this.status=s.Stopped,this._initialState=void 0;try{// we are going to stop within the current sync frame
// so we can safely just cancel this here as nothing async should be fired anyway
for(var x=d(Object.keys(this.delayedEventsMap)),S=x.next();!S.done;S=x.next()){var E=S.value;this.clock.clearTimeout(this.delayedEventsMap[E])}}catch(t){u={error:t}}finally{try{S&&!S.done&&(h=x.return)&&h.call(x)}finally{if(u)throw u.error}}// clear everything that might be enqueued
this.scheduler.clear(),this.scheduler=new tM({deferEvents:this.options.deferEvents})},/**
   * Stops the interpreter and unsubscribe all listeners.
   *
   * This will also notify the `onStop` listeners.
   */t.prototype.stop=function(){// TODO: add warning for stopping non-root interpreters
var t=this,e=this.scheduler;// grab the current scheduler as it will be replaced in _stop
return this._stop(),e.schedule(function(){if(null===(e=t._state)||void 0===e||!e.done){// it feels weird to handle this here but we need to handle this even slightly "out of band"
var e,n=tt({type:"xstate.stop"}),i=tR(t,function(){var e=q(p([],f(t.state.configuration),!1).sort(function(t,e){return e.order-t.order}).map(function(e){return th(e.onExit,t.machine.options.actions)})),i=f(ty(t.machine,t.state,t.state.context,n,[{type:"exit",actions:e}],t.machine.config.predictableActionArguments?t._exec:void 0,t.machine.config.predictableActionArguments||t.machine.config.preserveActionOrder),2),r=i[0],o=i[1],s=new tN({value:t.state.value,context:o,_event:n,_sessionid:t.sessionId,historyValue:void 0,history:t.state,actions:r.filter(function(t){return!ts(t)}),activities:{},events:[],configuration:[],transitions:[],children:{},done:t.state.done,tags:t.state.tags,machine:t.machine});return s.changed=!0,s});t.update(i,n),t._stopChildren(),tP.free(t.sessionId)}}),this},t.prototype.batch=function(t){var e=this;if(this.status===s.NotStarted&&this.options.deferEvents);else if(this.status!==s.Running)throw Error("".concat(t.length,' event(s) were sent to uninitialized service "').concat(this.machine.id,'". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.'));if(t.length){var n=!!this.machine.config.predictableActionArguments&&this._exec;this.scheduler.schedule(function(){var i,r,o=e.state,s=!1,a=[];try{for(var c=d(t),u=c.next();!u.done;u=c.next()){var l=u.value;!function(t){var i=tt(t);e.forward(i),o=tR(e,function(){return e.machine.transition(o,i,void 0,n||void 0)}),a.push.apply(a,p([],f(e.machine.config.predictableActionArguments?o.actions:o.actions.map(function(t){var e,n;return e=o,n=t.exec,h(h({},t),{exec:void 0!==n?function(){return n(e.context,e.event,{action:t,state:e,_event:e._event})}:void 0})})),!1)),s=s||!!o.changed}(l)}}catch(t){i={error:t}}finally{try{u&&!u.done&&(r=c.return)&&r.call(c)}finally{if(i)throw i.error}}o.changed=s,o.actions=a,e.update(o,tt(t[t.length-1]))})}},/**
   * Returns a send function bound to this interpreter instance.
   *
   * @param event The event to be sent by the sender.
   */t.prototype.sender=function(t){return this.send.bind(this,t)},t.prototype._nextState=function(t,e){var n=this;void 0===e&&(e=!!this.machine.config.predictableActionArguments&&this._exec);var i=tt(t);if(0===i.name.indexOf(N)&&!this.state.nextEvents.some(function(t){return 0===t.indexOf(N)}))throw i.data.data;return tR(this,function(){return n.machine.transition(n.state,i,void 0,e||void 0)})},/**
   * Returns the next state given the interpreter's current state and the event.
   *
   * This is a pure method that does _not_ update the interpreter's state.
   *
   * @param event The event to determine the next state
   */t.prototype.nextState=function(t){return this._nextState(t,!1)},t.prototype.forward=function(t){var e,n;try{for(var i=d(this.forwardTo),r=i.next();!r.done;r=i.next()){var o=r.value,s=this.children.get(o);if(!s)throw Error("Unable to forward event '".concat(t,"' from interpreter '").concat(this.id,"' to nonexistant child '").concat(o,"'."));s.send(t)}}catch(t){e={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(e)throw e.error}}},t.prototype.defer=function(t){var e=this,n=this.clock.setTimeout(function(){"to"in t&&t.to?e.sendTo(t._event,t.to,!0):e.send(t._event)},t.delay);t.id&&(this.delayedEventsMap[t.id]=n)},t.prototype.cancel=function(t){this.clock.clearTimeout(this.delayedEventsMap[t]),delete this.delayedEventsMap[t]},t.prototype.exec=function(t,e,n){void 0===n&&(n=this.machine.options.actions),this._exec(t,e.context,e._event,n)},t.prototype.removeChild=function(t){var e;this.children.delete(t),this.forwardTo.delete(t),null===// such as when a child is added then removed while initializing the state
(e=this.state)||void 0===e||delete e.children[t]},t.prototype.stopChild=function(t){var e=this.children.get(t);e&&(this.removeChild(t),J(e.stop)&&e.stop())},t.prototype.spawn=function(t,e,n){if(this.status!==s.Running)return tD(t,e);if(Z(t))return this.spawnPromise(Promise.resolve(t),e);if(J(t))return this.spawnCallback(t,e);if(function(t){try{return"function"==typeof t.send}catch(t){return!1}}(t)&&"id"in t)return this.spawnActor(t,e);if(function(t){try{return"subscribe"in t&&J(t.subscribe)}catch(t){return!1}}(t))return this.spawnObservable(t,e);if(K(t))return this.spawnMachine(t,h(h({},n),{id:e}));if(null!==t&&"object"==typeof t&&"transition"in t&&"function"==typeof t.transition)return this.spawnBehavior(t,e);throw Error('Unable to spawn entity "'.concat(e,'" of type "').concat(typeof t,'".'))},t.prototype.spawnMachine=function(e,n){var i=this;void 0===n&&(n={});var r=new t(e,h(h({},this.options),{parent:this,id:n.id||e.id})),o=h(h({},tI),n);return o.sync&&r.onTransition(function(t){i.send(M,{state:t,id:r.id})}),this.children.set(r.id,r),o.autoForward&&this.forwardTo.add(r.id),r.onDone(function(t){i.removeChild(r.id),i.send(tt(t,{origin:r.id}))}).start(),r},t.prototype.spawnBehavior=function(t,e){var n,i,r,o,s,a,c,u,l,d,f=(n={id:e,parent:this},i=t.initialState,r=new Set,o=[],s=!1,a=function(){if(!s){for(s=!0;o.length>0;){var e=o.shift();i=t.transition(i,e,d),r.forEach(function(t){return t.next(i)})}s=!1}},c={id:n.id,send:function(t){o.push(t),a()},getSnapshot:function(){return i},subscribe:function(t,e,n){var o=tr(t,e,n);return r.add(o),o.next(i),{unsubscribe:function(){r.delete(o)}}}},l=h(((u={subscribe:function(){return{unsubscribe:function(){}}},id:"anonymous",getSnapshot:function(){}})[X]=function(){return this},u),c),d={parent:n.parent,self:l,id:n.id||"anonymous",observers:r},i=t.start?t.start(d):i,l);return this.children.set(e,f),f},t.prototype.spawnPromise=function(t,e){var n,i,r=this,o=!1;t.then(function(t){o||(i=t,r.removeChild(e),r.send(tt(tf(e,t),{origin:e})))},function(t){if(!o){r.removeChild(e);var n=tp(e,t);try{// Send "error.platform.id" to this (parent).
r.send(tt(n,{origin:e}))}catch(t){r.devTools&&r.devTools.send(n,r.state),r.machine.strict&&// exception/promise rejection happens but because we don't want to
// break existing code so enforce it on strict mode only especially so
// because documentation says that onError is optional
r.stop()}}});var s=((n={id:e,send:function(){},subscribe:function(e,n,i){var r=tr(e,n,i),o=!1;return t.then(function(t){!o&&(r.next(t),o||r.complete())},function(t){o||r.error(t)}),{unsubscribe:function(){return o=!0}}},stop:function(){o=!0},toJSON:function(){return{id:e}},getSnapshot:function(){return i}})[X]=function(){return this},n);return this.children.set(e,s),s},t.prototype.spawnCallback=function(t,e){var n,i,r,o=this,s=!1,a=new Set,c=new Set;try{r=t(function(t){i=t,c.forEach(function(e){return e(t)}),s||o.send(tt(t,{origin:e}))},function(t){a.add(t)})}catch(t){this.send(tp(e,t))}if(Z(r))// because transpiled async functions are not recognizable
return this.spawnPromise(r,e);var u=((n={id:e,send:function(t){return a.forEach(function(e){return e(t)})},subscribe:function(t){var e=tr(t);return c.add(e.next),{unsubscribe:function(){c.delete(e.next)}}},stop:function(){s=!0,J(r)&&r()},toJSON:function(){return{id:e}},getSnapshot:function(){return i}})[X]=function(){return this},n);return this.children.set(e,u),u},t.prototype.spawnObservable=function(t,e){var n,i,r=this,o=t.subscribe(function(t){i=t,r.send(tt(t,{origin:e}))},function(t){r.removeChild(e),r.send(tt(tp(e,t),{origin:e}))},function(){r.removeChild(e),r.send(tt(tf(e),{origin:e}))}),s=((n={id:e,send:function(){},subscribe:function(e,n,i){return t.subscribe(e,n,i)},stop:function(){return o.unsubscribe()},getSnapshot:function(){return i},toJSON:function(){return{id:e}}})[X]=function(){return this},n);return this.children.set(e,s),s},t.prototype.spawnActor=function(t,e){return this.children.set(e,t),t},t.prototype.spawnActivity=function(t){var e=this.machine.options&&this.machine.options.activities?this.machine.options.activities[t.type]:void 0;if(e){var n=e(this.state.context,t);this.spawnEffect(t.id,n)}// Start implementation
},t.prototype.spawnEffect=function(t,e){var n;this.children.set(t,((n={id:t,send:function(){},subscribe:function(){return{unsubscribe:function(){}}},stop:e||void 0,getSnapshot:function(){},toJSON:function(){return{id:t}}})[X]=function(){return this},n))},t.prototype.attachDev=function(){var t=tC();if(this.options.devTools&&t){if(t.__REDUX_DEVTOOLS_EXTENSION__){var e="object"==typeof this.options.devTools?this.options.devTools:void 0;this.devTools=t.__REDUX_DEVTOOLS_EXTENSION__.connect(h(h({name:this.id,autoPause:!0,stateSanitizer:function(t){return{value:t.value,context:t.context,actions:t.actions}}},e),{features:h({jump:!1,skip:!1},e?e.features:void 0)}),this.machine),this.devTools.init(this.state)}// add XState-specific dev tooling hook
!function(t){if(tC()){var e=function(){var t=tC();if(t&&"__xstate__"in t)return t.__xstate__}();e&&e.register(t)}}(this)}},t.prototype.toJSON=function(){return{id:this.id}},t.prototype[X]=function(){return this},t.prototype.getSnapshot=function(){return this.status===s.NotStarted?this.initialState:this._state},/**
   * The default interpreter options:
   *
   * - `clock` uses the global `setTimeout` and `clearTimeout` functions
   * - `logger` uses the global `console.log()` method
   */t.defaultOptions={execute:!0,deferEvents:!0,clock:{setTimeout:function(t,e){return setTimeout(t,e)},clearTimeout:function(t){return clearTimeout(t)}},logger:/*#__PURE__*/console.log.bind(console),devTools:!1},t.interpret=tU,t}();/**
 * Creates a new Interpreter instance for the given machine with the provided options, if any.
 *
 * @param machine The machine to interpret
 * @param options Interpreter options
 */function tU(t,e){return new tj(t,e)}function tF(t){return h(h({type:O},t),{toJSON:function(){t.onDone,t.onError;var e=l(t,["onDone","onError"]);return h(h({},e),{type:O,src:function(t){if("string"==typeof t){var e={type:t};return e.toString=function(){return t},e}return t}(t.src)})}})}var tV={},tq=function(t){return"#"===t[0]},tB=/*#__PURE__*//** @class */function(){function t(/**
   * The raw config used to create the machine.
   */e,n,/**
   * The initial extended state
   */i,r){void 0===i&&(i="context"in e?e.context:void 0);var o,s=this;this.config=e,this._context=i,/**
     * The order this state node appears. Corresponds to the implicit SCXML document order.
     */this.order=-1,this.__xstatenode=!0,this.__cache={events:void 0,relativeValue:new Map,initialStateValue:void 0,initialState:void 0,on:void 0,transitions:void 0,candidates:{},delayedTransitions:void 0},this.idMap={},this.tags=[],this.options=Object.assign({actions:{},guards:{},services:{},activities:{},delays:{}},n),this.parent=null==r?void 0:r.parent,this.key=this.config.key||(null==r?void 0:r.key)||this.config.id||"(machine)",this.machine=this.parent?this.parent.machine:this,this.path=this.parent?this.parent.path.concat(this.key):[],this.delimiter=this.config.delimiter||(this.parent?this.parent.delimiter:"."),this.id=this.config.id||p([this.machine.key],f(this.path),!1).join(this.delimiter),this.version=this.parent?this.parent.version:this.config.version,this.type=this.config.type||(this.config.parallel?"parallel":this.config.states&&Object.keys(this.config.states).length?"compound":this.config.history?"history":"atomic"),this.schema=this.parent?this.machine.schema:null!==(o=this.config.schema)&&void 0!==o?o:{},this.description=this.config.description,this.initial=this.config.initial,this.states=this.config.states?j(this.config.states,function(e,n){var i,r=new t(e,{},void 0,{parent:s,key:n});return Object.assign(s.idMap,h(((i={})[r.id]=r,i),r.idMap)),r}):tV;var a=0;!function t(e){var n,i;e.order=a++;try{for(var r=d(tm(e)),o=r.next();!o.done;o=r.next()){var s=o.value;t(s)}}catch(t){n={error:t}}finally{try{o&&!o.done&&(i=r.return)&&i.call(r)}finally{if(n)throw n.error}}}(this),this.history=!0===this.config.history?"shallow":this.config.history||!1,this._transient=!!this.config.always||!!this.config.on&&(Array.isArray(this.config.on)?this.config.on.some(function(t){return""===t.event}):""in this.config.on),this.strict=!!this.config.strict,this.onEntry=B(this.config.entry||this.config.onEntry).map(function(t){return tu(t)}),this.onExit=B(this.config.exit||this.config.onExit).map(function(t){return tu(t)}),this.meta=this.config.meta,this.doneData="final"===this.type?this.config.data:void 0,this.invoke=B(this.config.invoke).map(function(t,e){if(K(t)){var n,i,r=to(s.id,e);return s.machine.options.services=h(((n={})[r]=t,n),s.machine.options.services),tF({src:r,id:r})}if(Q(t.src)){var r=t.id||to(s.id,e);return tF(h(h({},t),{id:r,src:t.src}))}if(K(t.src)||J(t.src)){var r=t.id||to(s.id,e);return s.machine.options.services=h(((i={})[r]=t.src,i),s.machine.options.services),tF(h(h({id:r},t),{src:r}))}var o=t.src;return tF(h(h({id:to(s.id,e)},t),{src:o}))}),this.activities=B(this.config.activities).concat(this.invoke).map(function(t){return tl(t)}),this.transition=this.transition.bind(this),this.tags=B(this.config.tags);// state node getters are deprecated
// if (!this.parent) {
//   this._init();
// }
}return t.prototype._init=function(){this.__cache.transitions||(function t(e){var n=[e];return tg(e)?n:n.concat(q(tw(e).map(t)))})(this).forEach(function(t){return t.on})},/**
   * Clones this state machine with custom options and context.
   *
   * @param options Options (actions, guards, activities, services) to recursively merge with the existing options.
   * @param context Custom context (will override predefined context)
   */t.prototype.withConfig=function(e,n){var i=this.options,r=i.actions,o=i.activities,s=i.guards,a=i.services,c=i.delays;return new t(this.config,{actions:h(h({},r),e.actions),activities:h(h({},o),e.activities),guards:h(h({},s),e.guards),services:h(h({},a),e.services),delays:h(h({},c),e.delays)},null!=n?n:this.context)},/**
   * Clones this state machine with custom context.
   *
   * @param context Custom context (will override predefined context, not recursive)
   */t.prototype.withContext=function(e){return new t(this.config,this.options,e)},Object.defineProperty(t.prototype,"context",{get:function(){return J(this._context)?this._context():this._context},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"definition",{/**
     * The well-structured state node definition.
     */get:function(){return{id:this.id,key:this.key,version:this.version,context:this.context,type:this.type,initial:this.initial,history:this.history,states:j(this.states,function(t){return t.definition}),on:this.on,transitions:this.transitions,entry:this.onEntry,exit:this.onExit,activities:this.activities||[],meta:this.meta,order:this.order||-1,data:this.doneData,invoke:this.invoke,description:this.description,tags:this.tags}},enumerable:!1,configurable:!0}),t.prototype.toJSON=function(){return this.definition},Object.defineProperty(t.prototype,"on",{/**
     * The mapping of events to transitions.
     */get:function(){if(this.__cache.on)return this.__cache.on;var t=this.transitions;return this.__cache.on=t.reduce(function(t,e){return t[e.eventType]=t[e.eventType]||[],t[e.eventType].push(e),t},{})},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"after",{get:function(){return this.__cache.delayedTransitions||(this.__cache.delayedTransitions=this.getDelayedTransitions(),this.__cache.delayedTransitions)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"transitions",{/**
     * All the transitions that can be taken from this state node.
     */get:function(){return this.__cache.transitions||(this.__cache.transitions=this.formatTransitions(),this.__cache.transitions)},enumerable:!1,configurable:!0}),t.prototype.getCandidates=function(t){if(this.__cache.candidates[t])return this.__cache.candidates[t];var e=""===t,n=this.transitions.filter(function(n){var i=n.eventType===t;// null events should only match against eventless transitions
return e?i:i||"*"===n.eventType});return this.__cache.candidates[t]=n,n},/**
   * All delayed transitions from the config.
   */t.prototype.getDelayedTransitions=function(){var t=this,e=this.config.after;if(!e)return[];var n=function(e,n){var r,o,s,a,c=(r=J(e)?"".concat(t.id,":delay[").concat(n,"]"):e,s=(o=t.id)?"#".concat(o):"","".concat(i.After,"(").concat(r,")").concat(s));return t.onEntry.push({to:(a={delay:e}).to,type:m,event:J(c)?c:W(c),delay:a?a.delay:void 0,// TODO: don't auto-generate IDs here like that
// there is too big chance of the ID collision
id:a&&void 0!==a.id?a.id:J(c)?c.name:k(c)}),t.onExit.push({type:w,sendId:c}),c};return(H(e)?e.map(function(t,e){var i=n(t.delay,e);return h(h({},t),{event:i})}):q(Object.keys(e).map(function(t,i){var r=e[t],o=Q(r)?{target:r}:r,s=isNaN(+t)?t:+t,a=n(s,i);return B(o).map(function(t){return h(h({},t),{event:a,delay:s})})}))).map(function(e){var n=e.delay;return h(h({},t.formatTransition(e)),{delay:n})})},/**
   * Returns the state nodes represented by the current state value.
   *
   * @param state The state value or State instance
   */t.prototype.getStateNodes=function(t){var e,n=this;if(!t)return[];var i=t instanceof tN?t.value:C(t,this.delimiter);if(Q(i)){var r=this.getStateNode(i).initial;return void 0!==r?this.getStateNodes(((e={})[i]=r,e)):[this,this.states[i]]}var o=Object.keys(i),s=[this];return s.push.apply(s,p([],f(q(o.map(function(t){return n.getStateNode(t).getStateNodes(i[t])}))),!1)),s},/**
   * Returns `true` if this state node explicitly handles the given event.
   *
   * @param event The event in question
   */t.prototype.handles=function(t){var e=k(t);return this.events.includes(e)},/**
   * Resolves the given `state` to a new `State` instance relative to this machine.
   *
   * This ensures that `.events` and `.nextEvents` represent the correct values.
   *
   * @param state The state to resolve
   */t.prototype.resolveState=function(t){var e=t instanceof tN?t:tN.create(t),n=Array.from(tb([],this.getStateNodes(e.value)));return new tN(h(h({},e),{value:this.resolve(e.value),configuration:n,done:tE(n,this),tags:tO(n),machine:this.machine}))},t.prototype.transitionLeafNode=function(t,e,n){var i=this.getStateNode(t).next(e,n);return i&&i.transitions.length?i:this.next(e,n)},t.prototype.transitionCompoundNode=function(t,e,n){var i=Object.keys(t),r=this.getStateNode(i[0])._transition(t[i[0]],e,n);return r&&r.transitions.length?r:this.next(e,n)},t.prototype.transitionParallelNode=function(t,e,n){var i,r,o={};try{for(var s=d(Object.keys(t)),a=s.next();!a.done;a=s.next()){var c=a.value,u=t[c];if(u){var h=this.getStateNode(c)._transition(u,e,n);h&&(o[c]=h)}}}catch(t){i={error:t}}finally{try{a&&!a.done&&(r=s.return)&&r.call(s)}finally{if(i)throw i.error}}var l=Object.keys(o).map(function(t){return o[t]}),f=q(l.map(function(t){return t.transitions}));if(!l.some(function(t){return t.transitions.length>0}))return this.next(e,n);var p=q(Object.keys(o).map(function(t){return o[t].configuration}));return{transitions:f,exitSet:q(l.map(function(t){return t.exitSet})),configuration:p,source:e,actions:q(Object.keys(o).map(function(t){return o[t].actions}))}},t.prototype._transition=function(t,e,n){return(// leaf node
Q(t)?this.transitionLeafNode(t,e,n):1===Object.keys(t).length?this.transitionCompoundNode(t,e,n):this.transitionParallelNode(t,e,n))},t.prototype.getTransitionData=function(t,e){return this._transition(t.value,t,tt(e))},t.prototype.next=function(t,e){var n,i,r,o=this,s=e.name,a=[],c=[];try{for(var u=d(this.getCandidates(s)),h=u.next();!h.done;h=u.next()){var l=h.value,v=l.cond,y=l.in,g=t.context,m=!y||(Q(y)&&tq(y)?t.matches(C(this.getStateNodeById(y).path,this.delimiter)):L(C(y,this.delimiter),F(this.path.slice(0,-2))(t.value))),w=!1;try{w=!v||tn(this.machine,v,g,e,t)}catch(t){throw Error("Unable to evaluate guard '".concat(v.name||v.type,"' in transition for event '").concat(s,"' in state node '").concat(this.id,"':\n").concat(t.message))}if(w&&m){void 0!==l.target&&(c=l.target),a.push.apply(a,p([],f(l.actions),!1)),r=l;break}}}catch(t){n={error:t}}finally{try{h&&!h.done&&(i=u.return)&&i.call(u)}finally{if(n)throw n.error}}if(r){if(!c.length)return{transitions:[r],exitSet:[],configuration:t.value?[this]:[],source:t,actions:a};var b=q(c.map(function(e){return o.getRelativeStateNodes(e,t.historyValue)})),x=!!r.internal;return{transitions:[r],exitSet:x?[]:q(c.map(function(t){return o.getPotentiallyReenteringNodes(t)})),configuration:b,source:t,actions:a}}},// we are pushing its result into `exitSet`
// that's because what we exit might be reentered (it's an invariant of reentrancy)
t.prototype.getPotentiallyReenteringNodes=function(t){if(this.order<t.order)return[this];for(var e=[],n=this;n&&n!==t;)e.push(n),n=n.parent;return n!==t?[]:(e.push(t),e)},t.prototype.getActions=function(t,e,n,r,o,s,a){var c,u,h,l,v=this,y=s?tb([],this.getStateNodes(s.value)):[],m=new Set;try{for(var w=d(Array.from(t).sort(function(t,e){return t.order-e.order})),b=w.next();!b.done;b=w.next()){var x=b.value;(!tS(y,x)||tS(n.exitSet,x)||x.parent&&m.has(x.parent))&&m.add(x)}}catch(t){c={error:t}}finally{try{b&&!b.done&&(u=w.return)&&u.call(w)}finally{if(c)throw c.error}}try{for(var S=d(y),E=S.next();!E.done;E=S.next()){var x=E.value;(!tS(t,x)||tS(n.exitSet,x.parent))&&n.exitSet.push(x)}}catch(t){h={error:t}}finally{try{E&&!E.done&&(l=S.return)&&l.call(S)}finally{if(h)throw h.error}}n.exitSet.sort(function(t,e){return e.order-t.order});var O=Array.from(m).sort(function(t,e){return t.order-e.order}),N=new Set(n.exitSet),_=q(O.map(function(t){var e=[];if("final"!==t.type)return e;var i=t.parent;if(!i.parent)return e;e.push(td(t.id,t.doneData),td(i.id,t.doneData?Y(t.doneData,r,o):void 0));var s=i.parent;return"parallel"===s.type&&tw(s).every(function(t){return tE(n.configuration,t)})&&e.push(td(s.id)),e})),M=O.map(function(t){var e=t.onEntry,n=t.activities.map(function(t){var e;return e=tl(t),{type:i.Start,activity:e,exec:void 0}});return{type:"entry",actions:th(a?p(p([],f(e),!1),f(n),!1):p(p([],f(n),!1),f(e),!1),v.machine.options.actions)}}).concat({type:"state_done",actions:_.map(function(t){var e;return{type:g,event:"function"==typeof t?t:W(t),delay:e?e.delay:void 0,id:null==e?void 0:e.id}})}),A=Array.from(N).map(function(t){return{type:"exit",actions:th(p(p([],f(t.onExit),!1),f(t.activities.map(function(t){var e;return e=J(t)?t:tl(t),{type:i.Stop,activity:e,exec:void 0}})),!1),v.machine.options.actions)}}).concat({type:"transition",actions:th(n.actions,this.machine.options.actions)}).concat(M);if(e){var R=th(q(p([],f(t),!1).sort(function(t,e){return e.order-t.order}).map(function(t){return t.onExit})),this.machine.options.actions).filter(function(t){return!ts(t)});return A.concat({type:"stop",actions:R})}return A},/**
   * Determines the next state given the current `state` and sent `event`.
   *
   * @param state The current State instance or state value
   * @param event The event that was sent at the current state
   * @param context The current context (extended state) of the current state
   */t.prototype.transition=function(t,e,n,i){void 0===t&&(t=this.initialState);var r,o,s=tt(e);if(t instanceof tN)o=void 0===n?t:this.resolveState(tN.from(t,n));else{var a=Q(t)?this.resolve(I(this.getResolvedPath(t))):this.resolve(t),c=null!=n?n:this.machine.context;o=this.resolveState(tN.from(a,c))}if(this.strict&&!this.events.includes(s.name)&&(r=s.name,!/^(done|error)\./.test(r)))throw Error("Machine '".concat(this.id,"' does not accept event '").concat(s.name,"'"));var u=this._transition(o.value,o,s)||{transitions:[],configuration:[],exitSet:[],source:o,actions:[]},h=tb([],this.getStateNodes(o.value)),l=u.configuration.length?tb(h,u.configuration):h;return u.configuration=p([],f(l),!1),this.resolveTransition(u,o,o.context,i,s)},t.prototype.resolveRaisedTransition=function(t,e,n,i){var r,o=t.actions;return(// TODO: this should be the raised event! Delete in V5 (breaking)
(t=this.transition(t,e,void 0,i))._event=n,t.event=n.data,(r=t.actions).unshift.apply(r,p([],f(o),!1)),t)},t.prototype.resolveTransition=function(t,e,n,i,r){var o,s,a,c,u,l,p=this;void 0===r&&(r=ta);var g=t.configuration,m=!e||t.transitions.length>0,w=m?t.configuration:e?e.configuration:[],x=tE(w,this),S=m?(s=tb([o=this.machine],g),function t(e,n){var i=n.get(e);if(!i)return{};// todo: fix?
if("compound"===e.type){var r=i[0];if(!r)return{};if(tg(r))return r.key}var o={};return i.forEach(function(e){o[e.key]=t(e,n)}),o}(o,tx(s))):void 0,E=e?e.historyValue?e.historyValue:t.source?this.machine.historyValue(e.value):void 0:void 0,N=this.getActions(new Set(w),x,t,n,r,e,i),_=e?h({},e.activities):{};// Transition will "apply" if:
try{for(var A=d(N),R=A.next();!R.done;R=A.next()){var T=R.value;try{for(var D=(u=void 0,d(T.actions)),L=D.next();!L.done;L=D.next()){var k=L.value;k.type===v?_[k.activity.id||k.activity.type]=k:k.type===y&&(_[k.activity.id||k.activity.type]=!1)}}catch(t){u={error:t}}finally{try{L&&!L.done&&(l=D.return)&&l.call(D)}finally{if(u)throw u.error}}}}catch(t){a={error:t}}finally{try{R&&!R.done&&(c=A.return)&&c.call(A)}finally{if(a)throw a.error}}var P=f(ty(this,e,n,r,N,i,this.machine.config.predictableActionArguments||this.machine.config.preserveActionOrder),2),C=P[0],I=P[1],U=f(function(t,e){var n,i,r=f([[],[]],2),o=r[0],s=r[1];try{for(var a=d(t),c=a.next();!c.done;c=a.next()){var u=c.value;e(u)?o.push(u):s.push(u)}}catch(t){n={error:t}}finally{try{c&&!c.done&&(i=a.return)&&i.call(a)}finally{if(n)throw n.error}}return[o,s]}(C,ts),2),F=U[0],V=U[1],q=C.filter(function(t){var e;return t.type===v&&(null===(e=t.activity)||void 0===e?void 0:e.type)===O}).reduce(function(t,e){var n,i,o,s,a,c,u,h;return t[e.activity.id]=(n=e.activity,i=p.machine,o=r,a=ti(n.src),c=null===(s=null==i?void 0:i.options.services)||void 0===s?void 0:s[a.type],u=n.data?Y(n.data,I,o):void 0,(h=c?tD(c,n.id,u):tT(n.id)).meta=n,h),t},e?h({},e.children):{}),B=new tN({value:S||e.value,context:I,_event:r,// Persist _sessionid between states
_sessionid:e?e._sessionid:null,historyValue:S?E?{current:S,states:function t(e,n){return j(e.states,function(e,i){if(e){var r=(Q(n)?void 0:n[i])||(e?e.current:void 0);if(r)return{current:r,states:t(e,r)}}})}(E,S)}:void 0:e?e.historyValue:void 0,history:!S||t.source?e:void 0,actions:S?V:[],activities:S?_:e?e.activities:{},events:[],configuration:w,transitions:t.transitions,children:q,done:x,tags:tO(w),machine:this}),Z=n!==I;B.changed=r.name===M||Z;var $=B.history;$&&delete $.history;// There are transient transitions if the machine is not in a final state
// and if some of the state nodes have transient ("always") transitions.
var z=!x&&(this._transient||g.some(function(t){return t._transient}));// If there are no enabled transitions, check if there are transient transitions.
// If there are transient transitions, continue checking for more transitions
// because an transient transition should be triggered even if there are no
// enabled transitions.
//
// If we're already working on an transient transition then stop to prevent an infinite loop.
//
// Otherwise, if there are no enabled nor transient transitions, we are done.
if(!m&&(!z||""===r.name))return B;var H=B;if(!x)for(z&&(H=this.resolveRaisedTransition(H,{type:b},r,i));F.length;){var J=F.shift();H=this.resolveRaisedTransition(H,J._event,r,i)}// Detect if state changed
var G=H.changed||($?!!H.actions.length||Z||typeof $.value!=typeof H.value||!function t(e,n){if(e===n)return!0;if(void 0===e||void 0===n)return!1;if(Q(e)||Q(n))return e===n;var i=Object.keys(e),r=Object.keys(n);return i.length===r.length&&i.every(function(i){return t(e[i],n[i])})}(H.value,$.value):void 0);return H.changed=G,H.history=$,H},/**
   * Returns the child state node from its relative `stateKey`, or throws.
   */t.prototype.getStateNode=function(t){if(tq(t))return this.machine.getStateNodeById(t);if(!this.states)throw Error("Unable to retrieve child state '".concat(t,"' from '").concat(this.id,"'; no child states exist."));var e=this.states[t];if(!e)throw Error("Child state '".concat(t,"' does not exist on '").concat(this.id,"'"));return e},/**
   * Returns the state node with the given `stateId`, or throws.
   *
   * @param stateId The state ID. The prefix "#" is removed.
   */t.prototype.getStateNodeById=function(t){var e=tq(t)?t.slice(1):t;if(e===this.id)return this;var n=this.machine.idMap[e];if(!n)throw Error("Child state node '#".concat(e,"' does not exist on machine '").concat(this.id,"'"));return n},/**
   * Returns the relative state node from the given `statePath`, or throws.
   *
   * @param statePath The string or string array relative path to the state node.
   */t.prototype.getStateNodeByPath=function(t){if("string"==typeof t&&tq(t))try{return this.getStateNodeById(t.slice(1))}catch(t){// throw e;
}for(var e=P(t,this.delimiter).slice(),n=this;e.length;){var i=e.shift();if(!i.length)break;n=n.getStateNode(i)}return n},/**
   * Resolves a partial state value with its full representation in this machine.
   *
   * @param stateValue The partial state value to resolve.
   */t.prototype.resolve=function(t){var e,n=this;if(!t)return this.initialStateValue||tV;// TODO: type-specific properties
switch(this.type){case"parallel":return j(this.initialStateValue,function(e,i){return e?n.getStateNode(i).resolve(t[i]||e):tV});case"compound":if(Q(t)){var i=this.getStateNode(t);if("parallel"===i.type||"compound"===i.type)return(e={})[t]=i.initialStateValue,e;return t}if(!Object.keys(t).length)return this.initialStateValue||{};return j(t,function(t,e){return t?n.getStateNode(e).resolve(t):tV});default:return t||tV}},t.prototype.getResolvedPath=function(t){if(tq(t)){var e=this.machine.idMap[t.slice(1)];if(!e)throw Error("Unable to find state node '".concat(t,"'"));return e.path}return P(t,this.delimiter)},Object.defineProperty(t.prototype,"initialStateValue",{get:function(){var t,e;if(this.__cache.initialStateValue)return this.__cache.initialStateValue;if("parallel"===this.type)e=U(this.states,function(t){return t.initialStateValue||tV},function(t){return"history"!==t.type});else if(void 0!==this.initial){if(!this.states[this.initial])throw Error("Initial state '".concat(this.initial,"' not found on '").concat(this.key,"'"));e=tg(this.states[this.initial])?this.initial:((t={})[this.initial]=this.states[this.initial].initialStateValue,t)}else e={};return this.__cache.initialStateValue=e,this.__cache.initialStateValue},enumerable:!1,configurable:!0}),t.prototype.getInitialState=function(t,e){this._init();// TODO: this should be in the constructor (see note in constructor)
var n=this.getStateNodes(t);return this.resolveTransition({configuration:n,exitSet:[],transitions:[],source:void 0,actions:[]},void 0,null!=e?e:this.machine.context,void 0)},Object.defineProperty(t.prototype,"initialState",{/**
     * The initial State instance, which includes all actions to be executed from
     * entering the initial state.
     */get:function(){var t=this.initialStateValue;if(!t)throw Error("Cannot retrieve initial state from simple state '".concat(this.id,"'."));return this.getInitialState(t)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"target",{/**
     * The target state value of the history state node, if it exists. This represents the
     * default state value to transition to if no history value exists yet.
     */get:function(){var t;if("history"===this.type){var e=this.config;t=Q(e.target)&&tq(e.target)?I(this.machine.getStateNodeById(e.target).path.slice(this.path.length-1)):e.target}return t},enumerable:!1,configurable:!0}),/**
   * Returns the leaf nodes from a state path relative to this state node.
   *
   * @param relativeStateId The relative state path to retrieve the state nodes
   * @param history The previous state to retrieve history
   * @param resolve Whether state nodes should resolve to initial child state nodes
   */t.prototype.getRelativeStateNodes=function(t,e,n){return void 0===n&&(n=!0),n?"history"===t.type?t.resolveHistory(e):t.initialStateNodes:[t]},Object.defineProperty(t.prototype,"initialStateNodes",{get:function(){var t=this;return tg(this)?[this]:"compound"!==this.type||this.initial?q(V(this.initialStateValue).map(function(e){return t.getFromRelativePath(e)})):[this]},enumerable:!1,configurable:!0}),/**
   * Retrieves state nodes from a relative path to this state node.
   *
   * @param relativePath The relative path from this state node
   * @param historyValue
   */t.prototype.getFromRelativePath=function(t){if(!t.length)return[this];var e=f(t),n=e[0],i=e.slice(1);if(!this.states)throw Error("Cannot retrieve subPath '".concat(n,"' from node with no states"));var r=this.getStateNode(n);if("history"===r.type)return r.resolveHistory();if(!this.states[n])throw Error("Child state '".concat(n,"' does not exist on '").concat(this.id,"'"));return this.states[n].getFromRelativePath(i)},t.prototype.historyValue=function(t){if(Object.keys(this.states).length)return{current:t||this.initialStateValue,states:U(this.states,function(e,n){if(!t)return e.historyValue();var i=Q(t)?void 0:t[n];return e.historyValue(i||e.initialStateValue)},function(t){return!t.history})}},/**
   * Resolves to the historical value(s) of the parent state node,
   * represented by state nodes.
   *
   * @param historyValue
   */t.prototype.resolveHistory=function(t){var e,n=this;if("history"!==this.type)return[this];var i=this.parent;if(!t){var r=this.target;return r?q(V(r).map(function(t){return i.getFromRelativePath(t)})):i.initialStateNodes}var o=(e=i.path,function(t){var n,i,r=t;try{for(var o=d(e),s=o.next();!s.done;s=o.next()){var a=s.value;r=r.states[a]}}catch(t){n={error:t}}finally{try{s&&!s.done&&(i=o.return)&&i.call(o)}finally{if(n)throw n.error}}return r})(t).current;return Q(o)?[i.getStateNode(o)]:q(V(o).map(function(t){return"deep"===n.history?i.getFromRelativePath(t):[i.states[t[0]]]}))},Object.defineProperty(t.prototype,"stateIds",{/**
     * All the state node IDs of this state node and its descendant state nodes.
     */get:function(){var t=this,e=q(Object.keys(this.states).map(function(e){return t.states[e].stateIds}));return[this.id].concat(e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"events",{/**
     * All the event types accepted by this state node and its descendants.
     */get:function(){if(this.__cache.events)return this.__cache.events;var t,e,n,i,r=this.states,o=new Set(this.ownEvents);if(r)try{for(var s=d(Object.keys(r)),a=s.next();!a.done;a=s.next()){var c=r[a.value];if(c.states)try{for(var u=(n=void 0,d(c.events)),h=u.next();!h.done;h=u.next()){var l=h.value;o.add("".concat(l))}}catch(t){n={error:t}}finally{try{h&&!h.done&&(i=u.return)&&i.call(u)}finally{if(n)throw n.error}}}}catch(e){t={error:e}}finally{try{a&&!a.done&&(e=s.return)&&e.call(s)}finally{if(t)throw t.error}}return this.__cache.events=Array.from(o)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"ownEvents",{/**
     * All the events that have transitions directly from this state node.
     *
     * Excludes any inert events.
     */get:function(){return Array.from(new Set(this.transitions.filter(function(t){return!(!t.target&&!t.actions.length&&t.internal)}).map(function(t){return t.eventType})))},enumerable:!1,configurable:!0}),t.prototype.resolveTarget=function(t){var e=this;if(void 0!==t)return t.map(function(t){if(!Q(t))return t;var n=t[0]===e.delimiter;// If internal target is defined on machine,
// do not include machine key on target
if(n&&!e.parent)return e.getStateNodeByPath(t.slice(1));var i=n?e.key+t:t;if(!e.parent)return e.getStateNodeByPath(i);try{return e.parent.getStateNodeByPath(i)}catch(t){throw Error("Invalid transition definition for state node '".concat(e.id,"':\n").concat(t.message))}})},t.prototype.formatTransition=function(t){var e=this,n=function(t){if(void 0!==t&&""!==t)return B(t)}(t.target),i="internal"in t?t.internal:!n||n.some(function(t){return Q(t)&&t[0]===e.delimiter}),r=this.machine.options.guards,o=this.resolveTarget(n),s=h(h({},t),{actions:th(B(t.actions)),cond:G(t.cond,r),target:o,source:this,internal:i,eventType:t.event,toJSON:function(){return h(h({},s),{target:s.target?s.target.map(function(t){return"#".concat(t.id)}):void 0,source:"#".concat(e.id)})}});return s},t.prototype.formatTransitions=function(){var t,e,n,i=this;if(this.config.on){if(Array.isArray(this.config.on))n=this.config.on;else{var r=this.config.on,o=r["*"],s=void 0===o?[]:o,a=l(r,["*"]);n=q(Object.keys(a).map(function(t){return te(t,a[t])}).concat(te("*",s)))}}else n=[];var c=this.config.always?te("",this.config.always):[],u=this.config.onDone?te(String(td(this.id)),this.config.onDone):[],h=q(this.invoke.map(function(t){var e=[];return t.onDone&&e.push.apply(e,p([],f(te(String(tf(t.id)),t.onDone)),!1)),t.onError&&e.push.apply(e,p([],f(te(String(tp(t.id)),t.onError)),!1)),e})),v=this.after,y=q(p(p(p(p([],f(u),!1),f(h),!1),f(n),!1),f(c),!1).map(function(t){return B(t).map(function(t){return i.formatTransition(t)})}));try{for(var g=d(v),m=g.next();!m.done;m=g.next()){var w=m.value;y.push(w)}}catch(e){t={error:e}}finally{try{m&&!m.done&&(e=g.return)&&e.call(g)}finally{if(t)throw t.error}}return y},t}(),tY=function(t){return{type:x,assignment:t}};function tZ(t,e,n){let i;switch(n){case c.DIVIDE:// Return an error when dividing by zero
if(0==e)return;i=t.dividedBy(e);break;case c.MULTIPLY:i=t.times(e);break;case c.SUBTRACT:i=t.minus(e);break;case c.ADD:i=t.plus(e);break;default:return}return i.toSignificantDigits(15).toString().indexOf("e")>=0&&(i=void 0),i}const t$=t=>0>t.display.indexOf("ERROR"),tz=new tB({predictableActionArguments:!0,id:"calculatorMachine",initial:"editFirstOperand",context:{firstOperand:void 0,secondOperand:void 0,result:void 0,memory:void 0,selectedOperator:void 0,display:"0"},states:{// State 1: Edit first operand ///////////////////////////////////////////
editFirstOperand:{on:{NUMBER:{actions:["appendToDisplay"]},DECIMAL:{actions:["appendDecimalPoint"]},SIGN:{actions:["negateDisplay"]},OPERATOR:[{cond:"canAppendMinus",actions:"appendMinus"},{target:"editOperator",actions:["saveFirstOperand","saveOperator"]}],DELETE:{actions:["removeFromDisplay"]},CLEAR:{actions:["resetAll"]},MEMORY_CLEAR:{actions:["resetMemory"]},MEMORY_RECALL:{actions:["setDisplayToMemory"]},MEMORY_PLUS:{actions:["addToMemory"]},MEMORY_MINUS:{actions:["subtractDisplayFromMemory"]}}},// State 2: Edit operator ////////////////////////////////////////////////
editOperator:{on:{NUMBER:{target:"editSecondOperand",actions:["resetDisplay","appendToDisplay"]},OPERATOR:{actions:["saveOperator"]},DELETE:{target:"editFirstOperand",actions:["resetFirstOperand","resetOperator"]},EQUALS:{target:"showResults",actions:["saveSecondOperand","execute","appendResultToDisplay"]},CLEAR:{target:"editFirstOperand",actions:["resetAll"]},MEMORY_CLEAR:{actions:["resetMemory"]},MEMORY_RECALL:{actions:["setDisplayToMemory"]},MEMORY_PLUS:{actions:["addToMemory"]},MEMORY_MINUS:{actions:["subtractDisplayFromMemory"]}}},// State 3: Edit second operand //////////////////////////////////////////
editSecondOperand:{on:{NUMBER:{actions:["appendToDisplay"]},DECIMAL:{actions:["appendDecimalPoint"]},SIGN:{actions:["negateDisplay"]},OPERATOR:{target:"editOperator",actions:["saveSecondOperand","execute","appendResultToDisplay","saveResultAsFirstOperand","saveOperator","resetSecondOperand"]},DELETE:{actions:["removeFromDisplay"]},EQUALS:{target:"showResults",actions:["saveSecondOperand","execute","appendResultToDisplay"]},CLEAR:{target:"editFirstOperand",actions:["resetAll"]},MEMORY_CLEAR:{actions:["resetMemory"]},MEMORY_RECALL:{actions:["setDisplayToMemory"]},MEMORY_PLUS:{actions:["addToMemory"]},MEMORY_MINUS:{actions:["subtractDisplayFromMemory"]}}},// State 4: Show results /////////////////////////////////////////////////
showResults:{entry:["verifyResults"],on:{NUMBER:{target:"editFirstOperand",actions:["resetAll","appendToDisplay"]},OPERATOR:{cond:"noError",target:"editOperator",actions:["resetSecondOperand","saveResultAsFirstOperand","saveOperator"]},EQUALS:{cond:"noError",target:"showResults",actions:["saveResultAsFirstOperand","execute","appendResultToDisplay"]},CLEAR:{target:"editFirstOperand",actions:["resetAll"]},MEMORY_CLEAR:{actions:["resetMemory"]},MEMORY_RECALL:{actions:["setDisplayToMemory"]},MEMORY_PLUS:{cond:"noError",actions:["addToMemory"]},MEMORY_MINUS:{cond:"noError",actions:["subtractDisplayFromMemory"]}}}}},{guards:{noError:t$,canAppendMinus:(t,e)=>e.value==c.SUBTRACT&&"0"===t.display},actions:{// Display actions ///////////////////////////////////////////////////////
appendToDisplay:tY({display:(t,e)=>{let n=t.display;return"0"===n?e.value:"-0"===n?"-"+e.value:15==n.length&&0>n.indexOf("-")||n.length>=16?n:n+e.value}}),removeFromDisplay:tY({display:t=>{let e=t.display;return(// Check for negative number with single digit
2==e.length&&e.indexOf("-")>=0?"0":e.length<=1?"0":e.slice(0,-1))}}),appendDecimalPoint:tY({display:t=>0>t.display.indexOf(".")?t.display+".":t.display}),appendMinus:tY({display:t=>"0"===t.display?"-0":t.display}),appendResultToDisplay:tY({display:t=>t.result?t.result.toSignificantDigits(15).toString():"ERROR"}),negateDisplay:tY({display:t=>0>t.display.indexOf("-")?"-"+t.display:t.display.slice(1)}),setDisplayToMemory:tY({display:t=>t.memory?t.memory.toSignificantDigits(15).toString():t.display}),// Save actions //////////////////////////////////////////////////////////
saveFirstOperand:tY({firstOperand:t=>new u.Decimal(t.display)}),saveSecondOperand:tY({secondOperand:t=>new u.Decimal(t.display)}),saveOperator:tY({selectedOperator:(t,e)=>e.value}),saveResultAsFirstOperand:tY({firstOperand:t=>t.result,result:()=>void 0}),addToMemory:tY({memory:t=>tZ(t.memory?t.memory:new u.Decimal(0),t.result?t.result:new u.Decimal(t.display),c.ADD)}),subtractDisplayFromMemory:tY({memory:t=>tZ(t.memory?t.memory:new u.Decimal(0),t.result?t.result:new u.Decimal(t.display),c.SUBTRACT)}),// Reset actions /////////////////////////////////////////////////////////
resetAll:tY({firstOperand:()=>void 0,secondOperand:()=>void 0,result:()=>void 0,selectedOperator:()=>void 0,display:()=>"0"}),resetFirstOperand:tY({firstOperand:()=>void 0}),resetSecondOperand:tY({secondOperand:()=>void 0}),resetOperator:tY({selectedOperator:()=>void 0}),resetDisplay:tY({display:()=>"0"}),resetMemory:tY({memory:()=>void 0}),// Execute actions ///////////////////////////////////////////////////////
execute:tY({result:t=>tZ(t.firstOperand,t.secondOperand,t.selectedOperator)}),verifyResults:tY({firstOperand:t=>t$(t)?t.firstOperand:void 0,secondOperand:t=>t$(t)?t.secondOperand:void 0,selectedOperator:t=>t$(t)?t.selectedOperator:void 0})}}),tH=document.querySelector(".operation"),tJ=document.querySelector(".result"),tQ=tU(tz).onTransition(t=>{let e=t.context;console.log(`State:       ${t.value} 
1st Operand: ${e.firstOperand} 
2nd Operand: ${e.secondOperand} 
Result:      ${e.result} 
Memory:      ${e.memory} 
Operator:    ${e.selectedOperator} 
Display:     ${e.display}`);var n="";void 0!==e.firstOperand&&(n+=e.firstOperand.toSignificantDigits(15).toString()),void 0!==e.selectedOperator&&(n+=` ${c.toString(e.selectedOperator)}`),void 0!==e.secondOperand&&(n+=` ${e.secondOperand.toSignificantDigits(15).toString()}`),tH.innerText=n,tJ.innerText=e.display});document.querySelector(".calc").addEventListener("pointerdown",function(t){if("BUTTON"===t.target.tagName){var e;let n;(n=function(t){switch(!0){case c.isNumber(t):return"NUMBER";case c.isOperator(t):return"OPERATOR";case c.EQUALS==t:return"EQUALS";case c.BACKSPACE==t:return"DELETE";case c.DECIMAL==t:return"DECIMAL";case c.SIGN==t:return"SIGN";case c.CLEAR==t:return"CLEAR";case c.MEMORY_CLEAR==t:return"MEMORY_CLEAR";case c.MEMORY_RECALL==t:return"MEMORY_RECALL";case c.MEMORY_PLUS==t:return"MEMORY_PLUS";case c.MEMORY_MINUS==t:return"MEMORY_MINUS";default:return}}(e=t.target.value))?tQ.send({type:n,value:e}):alert(`Error: button value "${e}" is not valid.`),t.target.classList.replace("btn-red","btn-red-active")||t.target.classList.replace("btn-alt","btn-alt-active")||t.target.classList.add("btn-active")}}),document.querySelector(".calc").addEventListener("pointerup",function(t){"BUTTON"===t.target.tagName&&(// Change color on click
t.target.classList.replace("btn-red-active","btn-red"),t.target.classList.replace("btn-alt-active","btn-alt"),t.target.classList.remove("btn-active"))}),document.querySelector("#dark-mode-toggle").addEventListener("pointerdown",function(){document.querySelector("#container").classList.toggle("dark-mode")}),// Set options for Decimal.js
(0,u.Decimal).set({toExpPos:15,toExpNeg:-14,precision:20}),tQ.start();//# sourceMappingURL=index.76f05fff.js.map

//# sourceMappingURL=index.76f05fff.js.map
