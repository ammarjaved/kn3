from ngeo import ExportUtility,WorkspaceManager,Workspaces,ConnectionObjects


myslconn = ConnectionObjects.MySQLConnection('18.224.27.72','testdb','root','Star@1990')


shapfilews = Workspaces.ShapeFileWorkspaceFactory(r"Y:\Downloads\GIS_SHP_Data")
shpNames = WorkspaceManager.list_layers_from_Workspace(shapfilews,'ALL')
for shp in shpNames:
    
    newname = "tfr_flood_{}".format(shp)
    lyr = shapfilews.GetLayer(shp)
    ExportUtility.featureClassToMySQL(lyr,myslconn,newname)
    print("Exported {}".format(newname))


