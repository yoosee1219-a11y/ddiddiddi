param([string]$Dst = (Join-Path $PSScriptRoot 'prototype\assets'))
Add-Type -AssemblyName System.Drawing
$base = 'https://d8j0ntlcm91z4.cloudfront.net/user_37VbiyJVZHoE6AaA36fWLQcKpOW/'
$jobs = @(
  @('monkey','E','hf_20260917_040140_122735ed-2e86-4354-a1ac-cfecff99f9c3'),
  @('monkey','N','hf_20260917_040140_abcbe135-4ddb-4912-8096-d581cfecdb0c'),
  @('monkey','S','hf_20260917_040140_48f7d3d7-513f-4d63-bfc4-9dfb8d4b9d6b'),
  @('rooster','E','hf_20260917_040141_1e264a81-a535-4114-b90d-d427bf8760be'),
  @('rooster','N','hf_20260917_040140_99bd433d-6727-4c6b-9f2c-2db5215ec9fb'),
  @('rooster','S','hf_20260917_040140_d46f2616-8171-4756-9098-df232e20d402'),
  @('dog','E','hf_20260917_040140_1536bd75-21a5-4b64-8522-a77358c596fc'),
  @('dog','N','hf_20260917_040141_873d438f-a7a9-41fc-8852-fe09ca98bf56'),
  @('dog','S','hf_20260917_040141_e2fb65c7-d2ce-4f89-8078-123e6d68c811'),
  @('pig','E','hf_20260917_040140_d567938f-7f94-444a-bf48-a297fe507521'),
  @('pig','N','hf_20260917_040140_386a98b0-751b-4155-9577-c939286ba232'),
  @('pig','S','hf_20260917_040140_c2439fcc-0165-4d7a-8b4a-20d25876980d'),
  @('rat','E','hf_20260917_040158_f1421f33-7d9d-4579-abad-9a9c2ee0e7d7'),
  @('rat','N','hf_20260917_040159_9dd3b550-3bf2-4a19-b0fb-7de91ce6877d'),
  @('rat','S','hf_20260917_040159_3dd140db-b2b7-4c68-9b0c-7404695504e2'),
  @('ox','E','hf_20260917_040158_fc3c557e-ed10-4f4f-8593-069f7efbfa6a'),
  @('ox','N','hf_20260917_040159_e60699a3-6149-4274-8814-b9de74559a52'),
  @('ox','S','hf_20260917_040158_3c607513-2d75-4e58-bd73-682285459870'),
  @('tiger','E','hf_20260917_040158_c9147f8d-443d-477c-8a61-bab898cd1907'),
  @('tiger','N','hf_20260917_040158_2c406514-0621-4a26-b2b9-64e52e64a278'),
  @('dragon','E','hf_20260917_040158_c387e397-8523-4f5d-a733-c025b4d05914'),
  @('dragon','N','hf_20260917_040158_720ce4c6-8de4-48c6-b955-f6d58cdd8298'),
  @('dragon','S','hf_20260917_040158_14d5b9d6-33e0-48e6-b5a8-9d3c44ccd292'),
  @('snake','E','hf_20260917_040217_eceb9db8-d591-4d5a-9dad-967f800a5aac'),
  @('snake','N','hf_20260917_040217_b5e89320-8437-42e2-bda5-3699cf6ac869'),
  @('snake','S','hf_20260917_040217_a4b9e022-b162-40cc-82f2-e74d1b314d0f'),
  @('horse','E','hf_20260917_040217_9cde2bd7-4888-4428-9e24-19f0baddf825'),
  @('horse','N','hf_20260917_040217_7476ef91-184e-4618-a922-42501d5b6fba'),
  @('horse','S','hf_20260917_040217_8be7d57f-bfc5-42d6-b325-a182d038fea5'),
  @('sheep','E','hf_20260917_040217_17f8512f-9cf0-42e9-bc74-8b6d3952af37'),
  @('sheep','N','hf_20260917_040217_20da5c08-b249-457a-a9bd-6b9e76d8b0f1'),
  @('sheep','S','hf_20260917_040217_a8928430-bc91-42df-8927-fe867b2918a3')
)
if ($args.Count -gt 0) { $jobs = @() ; foreach ($a in $args) { $p = $a -split ','; $jobs += ,@($p[0],$p[1],$p[2]) } }
$tmp = "$env:TEMP\zodiac"; New-Item -ItemType Directory -Force $tmp | Out-Null
New-Item -ItemType Directory -Force $Dst | Out-Null
foreach ($j in $jobs) {
  $name = "$($j[0])_$($j[1])"
  $raw = "$tmp\$name`_1024.png"
  Invoke-WebRequest -Uri ($base + $j[2] + '.png') -OutFile $raw
  $img = [System.Drawing.Image]::FromFile($raw)
  $bmp = New-Object System.Drawing.Bitmap 512,512
  $g = [System.Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode = 'HighQualityBicubic'
  $g.DrawImage($img, 0, 0, 512, 512); $g.Dispose()
  $out = "$tmp\$name.png"; $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose(); $img.Dispose()
  Copy-Item $out (Join-Path $Dst "$name.png") -Force
  Copy-Item $raw (Join-Path $Dst "$name`_1024.png") -Force
  Write-Host "ok $name"
}
